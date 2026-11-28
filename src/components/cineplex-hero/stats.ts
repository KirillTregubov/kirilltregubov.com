import { getCollection } from 'astro:content'

export type HeroTheatre = {
  id: string
  name: string
  area: string
  auditoriumCount: number
  latitude?: number
  longitude?: number
  formats: string[]
  ratios: string[]
  /** Auditoriums per format, e.g. { IMAX: 1, Regular: 15 }. */
  formatCounts: Record<string, number>
}

/** Priority for picking one format per auditorium, best first. */
export const formatOrder = [
  'IMAX 70mm',
  'IMAX',
  'UltraAVX',
  'SCREENX',
  '4DX',
  '70mm',
  'VIP 19+',
  'Clubhouse',
  'Regular',
]

/** "1-4, 7, 9" -> 6, "VIP 1-5" -> 5, "IMAX" -> 1. */
export function countAuditoriums(list: string) {
  return list.split(',').reduce((total, part) => {
    const range = part.trim().match(/(\d+)\s*-\s*(\d+)$/)
    return total + (range ? Number(range[2]) - Number(range[1]) + 1 : 1)
  }, 0)
}

const premiumFormats = [
  'IMAX 70mm',
  'IMAX',
  'UltraAVX',
  'SCREENX',
  '4DX',
  '70mm',
  'VIP 19+',
]

/** Shared numbers for the hero variants on /cineplex-toronto. */
export async function getHeroStats() {
  const theatres: HeroTheatre[] = (await getCollection('cinemas'))
    .map(({ data }) => ({
      id: data.id,
      name: data.name,
      area: data.area,
      auditoriumCount: data.auditoriumCount,
      latitude: data.location?.coordinates.latitude,
      longitude: data.location?.coordinates.longitude,
      formats: Array.from(new Set(data.auditoriums.flatMap((a) => a.formats))),
      formatCounts: data.auditoriums.reduce<Record<string, number>>(
        (counts, group) => {
          const format =
            formatOrder.find((f) => group.formats.includes(f as never)) ??
            group.formats[0]
          counts[format] =
            (counts[format] ?? 0) + countAuditoriums(group.auditoriums)
          return counts
        },
        {},
      ),
      ratios: Array.from(
        new Set(
          data.auditoriums
            .map((a) => a.screen.ratio)
            .filter((ratio) => ratio.includes(':')),
        ),
      ),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  const auditoriumCount = theatres.reduce((n, t) => n + t.auditoriumCount, 0)
  const formats = Array.from(new Set(theatres.flatMap((t) => t.formats)))
  const ratios = Array.from(new Set(theatres.flatMap((t) => t.ratios))).sort(
    (a, b) => Number(a.split(':')[0]) - Number(b.split(':')[0]),
  )
  const imaxCount = theatres.filter((t) =>
    t.formats.some((f) => f.startsWith('IMAX')),
  ).length

  const formatTheatreCounts = premiumFormats
    .map((format) => ({
      format,
      count: theatres.filter((t) => t.formats.includes(format)).length,
    }))
    .filter(({ count }) => count > 0)

  const formatAuditoriumTotals = Object.fromEntries(
    formatOrder.map((format) => [
      format,
      theatres.reduce((n, t) => n + (t.formatCounts[format] ?? 0), 0),
    ]),
  )

  return {
    theatres,
    formatAuditoriumTotals,
    theatreCount: theatres.length,
    auditoriumCount,
    formatCount: formats.length,
    ratios,
    imaxCount,
    formatTheatreCounts,
    largest: [...theatres].sort(
      (a, b) => b.auditoriumCount - a.auditoriumCount,
    )[0],
  }
}

export type HeroStats = Awaited<ReturnType<typeof getHeroStats>>

/** "Cineplex Cinemas Yonge-Dundas and VIP" -> "Yonge-Dundas". */
export function shortTheatreName(name: string) {
  if (name.startsWith('Scotiabank')) return 'Scotiabank'
  return name
    .replace(
      /^(Cineplex (Cinemas|Odeon|VIP Cinemas|Junxion)|SilverCity)\s+/,
      '',
    )
    .replace(/\s+(and VIP|Cinemas.*|and XSCAPE.*)$/, '')
    .replace(/\s+Cinemas$/, '')
    .trim()
}
