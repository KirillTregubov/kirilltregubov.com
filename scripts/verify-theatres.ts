#!/usr/bin/env bun

import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const DEFAULT_DATASET = 'src/content/cinemas/theatres.json'
const API_BASE = 'https://apis.cineplex.com/prod/cpx/theatrical/api/v1'
const API_KEY =
  process.env.CINEPLEX_API_KEY ?? process.env.CINEPLEX_SUBSCRIPTION_KEY
const FEATURE_PRIORITY = [
  '3D',
  'Laser Projection',
  'Dolby Atmos',
  'D-BOX',
  'Recliners',
] as const
const FORMATS = [
  'Regular',
  'UltraAVX',
  'IMAX',
  'IMAX 70mm',
  'SCREENX',
  '4DX',
  '70mm',
  'VIP 19+',
  'Clubhouse',
] as const
const SCREEN_RATIOS = [
  '1.43:1',
  '1.85:1',
  '1.90:1',
  '2.20:1',
  '2.39:1',
  'N/A',
] as const
const REQUEST_TIMEOUT_MS = 15_000
const CONCURRENCY = 6

type Feature = (typeof FEATURE_PRIORITY)[number]
type Format = (typeof FORMATS)[number]
type Severity = 'ERROR' | 'WARN' | 'INFO'

type AuditoriumProfile = {
  auditoriums: string
  formats: string[]
  features?: string[]
  screen?: { ratio?: string }
  details?: string
}

type Theatre = {
  id: string
  name: string
  area?: string
  location?: {
    address?: { addressLocality?: string; postalCode?: string }
  }
  auditoriumCount: number
  auditoriums: AuditoriumProfile[]
}

type Finding = {
  severity: Severity
  code: string
  theatre: string
  message: string
}

type RoomKey = {
  label: string
  namespace: 'number' | 'vip' | 'named' | 'unknown'
  number?: number
}

type RemoteTheatre = {
  theatreId: number
  theatreName: string
  location?: { city?: string; postalCode?: string }
}

type Observation = {
  rawLabels: Set<string>
  capabilities: Set<string>
  sessions: number
}

function parseArgs() {
  const args = process.argv.slice(2)
  const optionsWithValues = new Set(['--days', '--only'])
  const valueAfter = (name: string) => {
    const index = args.indexOf(name)
    return index >= 0 ? args[index + 1] : undefined
  }
  let positional: string | undefined
  for (let index = 0; index < args.length; index++) {
    const argument = args[index]
    if (optionsWithValues.has(argument)) {
      index++
      continue
    }
    if (!argument.startsWith('--')) {
      positional = argument
      break
    }
  }
  const days = Number(valueAfter('--days') ?? 7)
  if (!Number.isInteger(days) || days < 1 || days > 30) {
    throw new Error('--days must be an integer from 1 to 30')
  }
  return {
    path: resolve(positional ?? DEFAULT_DATASET),
    days,
    only: valueAfter('--only'),
    json: args.includes('--json'),
    offline: args.includes('--offline'),
    strict: args.includes('--strict'),
  }
}

function finding(
  findings: Finding[],
  severity: Severity,
  code: string,
  theatre: string,
  message: string,
) {
  findings.push({ severity, code, theatre, message })
}

function roomKey(label: string): RoomKey {
  const value = label.trim().replace(/\s+/g, ' ')
  if (value === '?') return { label: value, namespace: 'unknown' }
  if (/^\d+$/.test(value)) {
    return {
      label: String(Number(value)),
      namespace: 'number',
      number: Number(value),
    }
  }
  const vip = value.match(/^VIP\s+(\d+)$/i)
  if (vip)
    return {
      label: `VIP ${Number(vip[1])}`,
      namespace: 'vip',
      number: Number(vip[1]),
    }
  return { label: value, namespace: 'named' }
}

function expandToken(rawToken: string): RoomKey[] {
  const token = rawToken.trim().replace(/\s+/g, ' ')
  if (!token) throw new Error('empty auditorium token')

  const numericRange = token.match(/^(\d+)\s*-\s*(\d+)$/)
  if (numericRange) {
    const start = Number(numericRange[1])
    const end = Number(numericRange[2])
    if (start > end)
      throw new Error(`descending range ${JSON.stringify(token)}`)
    return Array.from({ length: end - start + 1 }, (_, index) =>
      roomKey(String(start + index)),
    )
  }

  const vipRange = token.match(/^VIP\s+(\d+)\s*-\s*(\d+)$/i)
  if (vipRange) {
    const start = Number(vipRange[1])
    const end = Number(vipRange[2])
    if (start > end)
      throw new Error(`descending range ${JSON.stringify(token)}`)
    return Array.from({ length: end - start + 1 }, (_, index) =>
      roomKey(`VIP ${start + index}`),
    )
  }

  const key = roomKey(token)
  if (
    key.namespace === 'named' &&
    !/^[\p{L}\p{N}][\p{L}\p{N} .+&'()/_-]*$/u.test(key.label)
  ) {
    throw new Error(`unrecognized auditorium token ${JSON.stringify(token)}`)
  }
  return [key]
}

function expandExpression(expression: string): RoomKey[] {
  if (typeof expression !== 'string' || !expression.trim()) {
    throw new Error('auditoriums must be a non-empty string')
  }
  return expression.split(',').flatMap(expandToken)
}

function isBeforeOrEqual(left: RoomKey, right: RoomKey) {
  if (
    left.namespace === right.namespace &&
    left.number !== undefined &&
    right.number !== undefined
  ) {
    return left.number <= right.number
  }
  if (left.namespace === 'number' && right.namespace === 'vip') return true
  if (left.namespace === 'vip' && right.namespace === 'number') return false
  return true
}

function arraysEqual(left: readonly string[], right: readonly string[]) {
  return (
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  )
}

function auditStatic(theatres: Theatre[], findings: Finding[]) {
  const ids = new Set<string>()
  const names = new Set<string>()

  for (const theatre of theatres) {
    const key = theatre.id || theatre.name || '<unknown>'
    if (!theatre.id || ids.has(theatre.id)) {
      finding(
        findings,
        'ERROR',
        'DUPLICATE_OR_MISSING_ID',
        key,
        `Invalid or repeated id ${JSON.stringify(theatre.id)}.`,
      )
    }
    if (!theatre.name || names.has(theatre.name)) {
      finding(
        findings,
        'ERROR',
        'DUPLICATE_OR_MISSING_NAME',
        key,
        `Invalid or repeated name ${JSON.stringify(theatre.name)}.`,
      )
    }
    ids.add(theatre.id)
    names.add(theatre.name)

    if (
      !Number.isInteger(theatre.auditoriumCount) ||
      theatre.auditoriumCount <= 0
    ) {
      finding(
        findings,
        'ERROR',
        'INVALID_AUDITORIUM_COUNT',
        key,
        `Expected a positive integer; got ${JSON.stringify(theatre.auditoriumCount)}.`,
      )
    }
    if (
      !Array.isArray(theatre.auditoriums) ||
      theatre.auditoriums.length === 0
    ) {
      finding(
        findings,
        'ERROR',
        'INVALID_AUDITORIUMS',
        key,
        'Expected at least one auditorium profile.',
      )
      continue
    }

    let previousFirst: RoomKey | undefined
    const occurrences = new Map<
      string,
      Array<{ profile: AuditoriumProfile; index: number }>
    >()

    theatre.auditoriums.forEach((profile, index) => {
      const label = `profile #${index + 1} (${JSON.stringify(profile.auditoriums)})`
      let rooms: RoomKey[] = []
      try {
        rooms = expandExpression(profile.auditoriums)
      } catch (error) {
        finding(
          findings,
          'ERROR',
          'INVALID_AUDITORIUM_SPEC',
          key,
          `${label}: ${(error as Error).message}.`,
        )
        return
      }

      for (let roomIndex = 1; roomIndex < rooms.length; roomIndex++) {
        if (!isBeforeOrEqual(rooms[roomIndex - 1], rooms[roomIndex])) {
          finding(
            findings,
            'ERROR',
            'UNSORTED_AUDITORIUM_EXPRESSION',
            key,
            `${label} is not in ascending order.`,
          )
          break
        }
      }

      const first = rooms[0]
      if (previousFirst && first && !isBeforeOrEqual(previousFirst, first)) {
        finding(
          findings,
          'ERROR',
          'UNSORTED_AUDITORIUM_PROFILES',
          key,
          `${label} starts with ${JSON.stringify(first.label)} after ${JSON.stringify(previousFirst.label)}. Sort profiles by their first auditorium.`,
        )
      }
      if (first?.namespace !== 'named' && first?.namespace !== 'unknown')
        previousFirst = first

      if (!Array.isArray(profile.formats) || profile.formats.length === 0) {
        finding(
          findings,
          'ERROR',
          'MISSING_FORMAT',
          key,
          `${label} must contain at least one format.`,
        )
      } else {
        const invalid = profile.formats.filter(
          (format) => !FORMATS.includes(format as Format),
        )
        const duplicates = profile.formats.filter(
          (format, i) => profile.formats.indexOf(format) !== i,
        )
        if (invalid.length)
          finding(
            findings,
            'ERROR',
            'INVALID_FORMAT',
            key,
            `${label} has unsupported format(s): ${[...new Set(invalid)].join(', ')}.`,
          )
        if (duplicates.length)
          finding(
            findings,
            'ERROR',
            'DUPLICATE_FORMAT',
            key,
            `${label} repeats format(s): ${[...new Set(duplicates)].join(', ')}.`,
          )
      }

      const features = profile.features ?? []
      const invalidFeatures = features.filter(
        (feature) => !FEATURE_PRIORITY.includes(feature as Feature),
      )
      const duplicateFeatures = features.filter(
        (feature, i) => features.indexOf(feature) !== i,
      )
      if (invalidFeatures.length)
        finding(
          findings,
          'ERROR',
          'INVALID_FEATURE',
          key,
          `${label} has unsupported feature(s): ${[...new Set(invalidFeatures)].join(', ')}.`,
        )
      if (duplicateFeatures.length)
        finding(
          findings,
          'ERROR',
          'DUPLICATE_FEATURE',
          key,
          `${label} repeats feature(s): ${[...new Set(duplicateFeatures)].join(', ')}.`,
        )
      if (!invalidFeatures.length) {
        const sorted = [...features].sort(
          (left, right) =>
            FEATURE_PRIORITY.indexOf(left as Feature) -
            FEATURE_PRIORITY.indexOf(right as Feature),
        )
        if (!arraysEqual(features, sorted)) {
          finding(
            findings,
            'ERROR',
            'UNSORTED_FEATURES',
            key,
            `${label} has [${features.join(', ')}]; expected [${sorted.join(', ')}].`,
          )
        }
      }

      const ratio = profile.screen?.ratio
      if (
        !ratio ||
        !SCREEN_RATIOS.includes(ratio as (typeof SCREEN_RATIOS)[number])
      ) {
        finding(
          findings,
          'ERROR',
          'INVALID_SCREEN_RATIO',
          key,
          `${label} has unsupported screen ratio ${JSON.stringify(ratio)}.`,
        )
      }

      for (const room of rooms) {
        if (room.namespace === 'unknown') {
          finding(
            findings,
            'WARN',
            'UNKNOWN_AUDITORIUM',
            key,
            `${label} uses "?" as its auditorium number.`,
          )
          continue
        }
        const list = occurrences.get(room.label) ?? []
        list.push({ profile, index })
        occurrences.set(room.label, list)
      }
    })

    for (const [room, entries] of occurrences) {
      for (let left = 0; left < entries.length; left++) {
        for (let right = left + 1; right < entries.length; right++) {
          const sharedFormats = entries[left].profile.formats.filter((format) =>
            entries[right].profile.formats.includes(format),
          )
          if (sharedFormats.length) {
            finding(
              findings,
              'ERROR',
              'DUPLICATE_ROOM_FORMAT',
              key,
              `Auditorium ${JSON.stringify(room)} repeats format(s) ${sharedFormats.join(', ')} in profiles #${entries[left].index + 1} and #${entries[right].index + 1}.`,
            )
          }
        }
      }
    }

    const described = occurrences.size
    if (described > theatre.auditoriumCount) {
      finding(
        findings,
        'ERROR',
        'AUDITORIUM_OVERCOUNT',
        key,
        `${described} distinct auditorium identifiers are described, but auditoriumCount is ${theatre.auditoriumCount}.`,
      )
    }
    if (described < theatre.auditoriumCount) {
      finding(
        findings,
        'INFO',
        'INCOMPLETE_COVERAGE',
        key,
        `${described}/${theatre.auditoriumCount} distinct auditorium identifiers are described.`,
      )
    }
  }
}

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[’']/g, '')
    .replace(/\band\b/g, ' ')
    .replace(
      /\btheatre\b|\btheaters\b|\bcinemas?\b|\bcineplex\b|\bodeon\b|\bsilvercity\b|\bvip\b|\bxscape\b|\bentertainment\b|\bcentre\b|\bcenter\b/g,
      ' ',
    )
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizePostal(value?: string) {
  return value?.replace(/\s+/g, '').toUpperCase() ?? ''
}

function normalizeCapability(value: string) {
  const normalized = value.trim().toLowerCase()
  if (normalized === 'ultraavx' || normalized === 'ultra avx') return 'UltraAVX'
  if (normalized === 'imax') return 'IMAX'
  if (normalized === 'screenx' || normalized === 'screen x') return 'SCREENX'
  if (normalized === '4dx') return '4DX'
  if (normalized === 'd-box' || normalized === 'dbox') return 'D-BOX'
  if (normalized === 'dolby atmos' || normalized === 'atmos')
    return 'Dolby Atmos'
  if (normalized === 'laser projection' || normalized === 'laser')
    return 'Laser Projection'
  if (normalized === 'recliner' || normalized === 'recliners')
    return 'Recliners'
  if (normalized === '3d') return '3D'
  if (normalized === 'clubhouse') return 'Clubhouse'
  if (normalized.includes('vip')) return 'VIP 19+'
  if (normalized === 'regular' || normalized === 'standard') return 'Regular'
  return value.trim()
}

async function cineplexFetch(path: string) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      Accept: 'application/json',
      'Ocp-Apim-Subscription-Key': API_KEY!,
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  })
  if (!response.ok)
    throw new Error(
      `HTTP ${response.status} ${response.statusText} for ${path}`,
    )
  const body = await response.text()
  return body ? JSON.parse(body) : null
}

function remoteTheatres(payload: any): RemoteTheatre[] {
  const all = [
    ...(payload?.favouriteTheatres ?? []),
    ...(payload?.nearbyTheatres ?? []),
    ...(payload?.otherTheatres ?? []),
  ]
  return [
    ...new Map(
      all
        .filter((item) => typeof item?.theatreId === 'number')
        .map((item) => [item.theatreId, item]),
    ).values(),
  ] as RemoteTheatre[]
}

function resolveRemote(local: Theatre, remotes: RemoteTheatre[]) {
  const localName = normalizeText(local.name)
  const localCity = normalizeText(
    local.location?.address?.addressLocality ?? '',
  )
  const localPostal = normalizePostal(local.location?.address?.postalCode)
  return remotes
    .map((remote) => {
      const remoteName = normalizeText(remote.theatreName)
      const a = new Set(localName.split(' ').filter(Boolean))
      const b = new Set(remoteName.split(' ').filter(Boolean))
      const overlap = [...a].filter((word) => b.has(word)).length
      let score =
        localName === remoteName
          ? 100
          : (overlap / Math.max(a.size, b.size, 1)) * 70
      if (localName.includes(remoteName) || remoteName.includes(localName))
        score += 20
      if (localCity && localCity === normalizeText(remote.location?.city ?? ''))
        score += 15
      if (
        localPostal &&
        localPostal === normalizePostal(remote.location?.postalCode)
      )
        score += 40
      return { remote, score }
    })
    .sort((left, right) => right.score - left.score)[0]
}

function datesFromToday(count: number) {
  const today = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Toronto',
  }).format(new Date())
  const start = new Date(`${today}T12:00:00Z`)
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(start)
    date.setUTCDate(date.getUTCDate() + index)
    return date.toISOString().slice(0, 10)
  })
}

function canonicalLiveRoom(raw: string) {
  const value = raw.trim()
  let match = value.match(/^VIP\s*#?\s*0*(\d+)\b/i)
  if (match) return `VIP ${Number(match[1])}`
  match = value.match(
    /^(?:Aud(?:itorium)?|Cinema|Theatre|AVX|UltraAVX|SCREENX|4DX|Clubhouse|IMAX)\s*#?\s*0*(\d+)\b/i,
  )
  if (match) return String(Number(match[1]))
  if (/^IMAX\b/i.test(value)) return 'IMAX'
  return value
}

function collectObservations(payloads: any[]) {
  const sessions = new Map<
    string,
    { room: string; capabilities: Set<string> }
  >()
  let fallback = 0
  for (const payload of payloads) {
    for (const theatre of Array.isArray(payload) ? payload : [payload]) {
      for (const day of theatre?.dates ?? []) {
        for (const movie of day?.movies ?? []) {
          for (const experience of movie?.experiences ?? []) {
            const capabilities = (experience?.experienceTypes ?? []).map(
              normalizeCapability,
            )
            for (const session of experience?.sessions ?? []) {
              if (session?.isInThePast || !session?.auditorium) continue
              const id = String(
                session.vistaSessionId ?? `fallback-${fallback++}`,
              )
              const existing = sessions.get(id)
              if (existing)
                capabilities.forEach((capability: string) =>
                  existing.capabilities.add(capability),
                )
              else
                sessions.set(id, {
                  room: String(session.auditorium),
                  capabilities: new Set(capabilities),
                })
            }
          }
        }
      }
    }
  }

  const observations = new Map<string, Observation>()
  for (const session of sessions.values()) {
    const key = canonicalLiveRoom(session.room)
    const bucket = observations.get(key) ?? {
      rawLabels: new Set(),
      capabilities: new Set(),
      sessions: 0,
    }
    bucket.rawLabels.add(session.room)
    session.capabilities.forEach((capability) =>
      bucket.capabilities.add(capability),
    )
    bucket.sessions++
    observations.set(key, bucket)
  }
  return observations
}

async function mapWithConcurrency<T, R>(
  items: T[],
  limit: number,
  callback: (item: T) => Promise<R>,
) {
  const output = new Array<R>(items.length)
  let next = 0
  async function worker() {
    while (next < items.length) {
      const index = next++
      output[index] = await callback(items[index])
    }
  }
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker),
  )
  return output
}

async function auditLive(
  theatres: Theatre[],
  days: number,
  findings: Finding[],
) {
  const remotes = remoteTheatres(await cineplexFetch('/theatres?language=en'))
  const dates = datesFromToday(days)

  await mapWithConcurrency(theatres, CONCURRENCY, async (theatre) => {
    const resolution = resolveRemote(theatre, remotes)
    if (!resolution || resolution.score < 50) {
      finding(
        findings,
        'ERROR',
        'THEATRE_NOT_FOUND',
        theatre.id,
        'Could not confidently match this theatre to Cineplex.',
      )
      return
    }

    const payloads: any[] = []
    for (const date of dates) {
      try {
        payloads.push(
          await cineplexFetch(
            `/showtimes?language=en&locationId=${resolution.remote.theatreId}&date=${date}`,
          ),
        )
      } catch (error) {
        finding(
          findings,
          'WARN',
          'SHOWTIME_FETCH_FAILED',
          theatre.id,
          `${date}: ${(error as Error).message}`,
        )
      }
    }
    if (!payloads.length) return

    const configured = new Map<string, Set<string>>()
    for (const profile of theatre.auditoriums) {
      const capabilities = [...profile.formats, ...(profile.features ?? [])]
      if (profile.formats.includes('IMAX 70mm')) {
        capabilities.push('IMAX', '70mm')
      }
      for (const room of expandExpression(profile.auditoriums)) {
        if (room.namespace === 'unknown') continue
        const bucket = configured.get(room.label) ?? new Set<string>()
        capabilities.forEach((capability) => bucket.add(capability))
        configured.set(room.label, bucket)
      }
    }

    for (const [room, observation] of collectObservations(payloads)) {
      let configuredCapabilities = configured.get(room)
      if (!configuredCapabilities && room === 'IMAX') {
        const imaxProfiles = [...configured.entries()].filter(([, values]) =>
          values.has('IMAX'),
        )
        if (imaxProfiles.length === 1)
          configuredCapabilities = imaxProfiles[0][1]
      }
      if (!configuredCapabilities) {
        finding(
          findings,
          'WARN',
          'UNMAPPED_LIVE_AUDITORIUM',
          theatre.id,
          `Cineplex reported ${JSON.stringify([...observation.rawLabels][0])} (${observation.sessions} session(s)), but it is absent from the dataset.`,
        )
        continue
      }

      const meaningful = [...observation.capabilities].filter(
        (capability) =>
          capability !== 'Regular' &&
          (FORMATS.includes(capability as Format) ||
            FEATURE_PRIORITY.includes(capability as Feature)),
      )
      const missing = meaningful.filter(
        (capability) => !configuredCapabilities!.has(capability),
      )
      if (missing.length) {
        finding(
          findings,
          'WARN',
          'LIVE_CAPABILITY_NOT_IN_DATASET',
          theatre.id,
          `${room}: Cineplex reported ${missing.join(', ')}, but the dataset does not.`,
        )
      }
    }
  })
}

function print(findings: Finding[], file: string, live: boolean) {
  const counts = {
    errors: findings.filter((item) => item.severity === 'ERROR').length,
    warnings: findings.filter((item) => item.severity === 'WARN').length,
    info: findings.filter((item) => item.severity === 'INFO').length,
  }
  console.log(
    `Verifying ${file}${live ? ' with live Cineplex observations' : ' (local checks only)'}`,
  )
  for (const item of findings) {
    console.log(
      `${item.severity.padEnd(5)} [${item.code}] ${item.theatre}: ${item.message}`,
    )
  }
  console.log(
    `Result: ${counts.errors} error(s), ${counts.warnings} warning(s), ${counts.info} info notice(s).`,
  )
  return counts
}

async function main() {
  const options = parseArgs()
  const parsed = JSON.parse(await readFile(options.path, 'utf8')) as unknown
  if (!Array.isArray(parsed))
    throw new Error('Expected the root JSON value to be an array of theatres.')
  let theatres = parsed as Theatre[]
  if (options.only)
    theatres = theatres.filter((theatre) => theatre.id === options.only)
  if (!theatres.length)
    throw new Error(`No theatre matched ${JSON.stringify(options.only)}.`)

  const findings: Finding[] = []
  auditStatic(theatres, findings)
  const runLive = !options.offline && Boolean(API_KEY)
  if (runLive) await auditLive(theatres, options.days, findings)
  else if (!options.offline && !API_KEY) {
    finding(
      findings,
      'INFO',
      'LIVE_CHECK_SKIPPED',
      '<dataset>',
      'Set CINEPLEX_API_KEY to include live auditorium, format, and feature checks.',
    )
  }

  const counts = options.json
    ? (() => {
        const result = {
          file: options.path,
          live: runLive,
          errors: findings.filter((item) => item.severity === 'ERROR').length,
          warnings: findings.filter((item) => item.severity === 'WARN').length,
          info: findings.filter((item) => item.severity === 'INFO').length,
          findings,
        }
        console.log(JSON.stringify(result, null, 2))
        return result
      })()
    : print(findings, options.path, runLive)

  process.exit(
    counts.errors > 0 || (options.strict && counts.warnings > 0) ? 1 : 0,
  )
}

main().catch((error) => {
  console.error(error instanceof Error ? (error.stack ?? error.message) : error)
  process.exit(2)
})
