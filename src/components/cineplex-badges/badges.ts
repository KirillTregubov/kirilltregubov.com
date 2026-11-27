const sources = import.meta.glob<string>('./svg/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const badgeFiles = {
  '3d': 'ThreeD',
  '4dx': 'FourDX',
  '70mm': 'SeventyMM',
  clubhouse: 'Clubhouse',
  closedcaption: 'ClosedCaption',
  dbox: 'DBox',
  describedvideo: 'DescribedVideo',
  dolbyatmos: 'DolbyAtmos',
  earlyaccess: 'EarlyAccess',
  earlyaccessen: 'EarlyAccess',
  eventpass: 'EventPass',
  fanexperience: 'FanExperience',
  hfr: 'HFR',
  imax: 'IMAX',
  imax3d: 'IMAX3D',
  imax3dhfr: 'IMAX3DHFR',
  imax70mm: 'IMAX70mm',
  imaxhfr: 'IMAXHFR',
  laserprojection: 'LaserProjection',
  lastchance: 'LastChance',
  primeseats: 'PrimeSeats',
  recliner: 'Recliners',
  recliners: 'Recliners',
  regular: 'Regular',
  screenx: 'ScreenX',
  sensoryfriendly: 'SensoryFriendly',
  sensoryfriendlyscreening: 'SensoryFriendly',
  starsandstrollers: 'StarsAndStrollers',
  ultraavx: 'UltraAVX',
  ultraavxhdr: 'UltraAVXHDR',
  ultraavxhdrbybarco: 'UltraAVXHDR',
  ultraavxhdrbybarconew: 'UltraAVXHDR',
  vip: 'VIP19Plus',
  vip18: 'VIP18Plus',
  vip18plus: 'VIP18Plus',
  vip19: 'VIP19Plus',
  vip19plus: 'VIP19Plus',
} as const satisfies Record<string, string>

type BadgeName = (typeof badgeFiles)[keyof typeof badgeFiles]

export type BadgeCategory = 'format' | 'feature' | 'showtime'

/**
 * Display names, as Cineplex writes them, and what each badge describes:
 * how the film is presented, the auditorium it plays in, or one screening.
 */
const badgeInfo: Record<BadgeName, { label: string; category: BadgeCategory }> =
  {
    ClosedCaption: { label: 'Closed Caption', category: 'showtime' },
    Clubhouse: { label: 'Clubhouse', category: 'feature' },
    DBox: { label: 'D-BOX', category: 'feature' },
    DescribedVideo: { label: 'Described Video', category: 'showtime' },
    DolbyAtmos: { label: 'Dolby Atmos', category: 'feature' },
    EarlyAccess: { label: 'Early Access', category: 'showtime' },
    EventPass: { label: 'Event Pass', category: 'showtime' },
    FanExperience: { label: 'Fan Experience', category: 'showtime' },
    FourDX: { label: '4DX', category: 'format' },
    HFR: { label: 'HFR', category: 'feature' },
    IMAX: { label: 'IMAX', category: 'format' },
    IMAX3D: { label: 'IMAX 3D', category: 'format' },
    IMAX3DHFR: { label: 'IMAX 3D HFR', category: 'format' },
    IMAX70mm: { label: 'IMAX 70mm', category: 'format' },
    IMAXHFR: { label: 'IMAX HFR', category: 'format' },
    LaserProjection: { label: 'Laser Projection', category: 'feature' },
    LastChance: { label: 'Last Chance', category: 'showtime' },
    PrimeSeats: { label: 'Prime Seats', category: 'feature' },
    Recliners: { label: 'Recliners', category: 'feature' },
    Regular: { label: 'Regular', category: 'format' },
    ScreenX: { label: 'SCREENX', category: 'format' },
    SensoryFriendly: {
      label: 'Sensory Friendly Screening',
      category: 'showtime',
    },
    SeventyMM: { label: '70mm', category: 'format' },
    StarsAndStrollers: { label: 'Stars and Strollers', category: 'showtime' },
    ThreeD: { label: '3D', category: 'feature' },
    UltraAVX: { label: 'UltraAVX', category: 'format' },
    UltraAVXHDR: {
      label: 'UltraAVX featuring HDR by Barco',
      category: 'format',
    },
    VIP18Plus: { label: 'VIP 18+', category: 'format' },
    VIP19Plus: { label: 'VIP 19+', category: 'format' },
  }

export type Badge = {
  /** SVG file name, without extension. */
  name: string
  label: string
  category: BadgeCategory
  /** Element id of the badge's `<symbol>` in the sprite. */
  id: string
  viewBox: string
  width: string
  height: string
  /** Markup inside the `<symbol>`. */
  body: string
  /** `<defs>` content, hoisted to the sprite so references resolve. */
  defs: string
}

const parseBadge = (name: string, source: string): Badge => {
  const id = `cineplex-badge-${name.toLowerCase()}`
  const svgTag = source.match(/<svg[^>]*>/)?.[0] ?? ''
  const attribute = (attr: string) =>
    svgTag.match(new RegExp(`\\s${attr}="([^"]+)"`))?.[1]
  const viewBox = attribute('viewBox')
  if (!viewBox) {
    throw new Error(`Cineplex badge ${name}.svg has no viewBox`)
  }

  // Namespace internal ids (e.g. Figma's clip0_*) so badges never collide.
  const inner = source
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .replace(/\bid="([^"]+)"/g, `id="${id}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${id}-$1)`)
  const defs = inner.match(/<defs>([\s\S]*?)<\/defs>/)?.[1] ?? ''

  return {
    name,
    label: badgeInfo[name as BadgeName]?.label ?? name,
    category: badgeInfo[name as BadgeName]?.category ?? 'feature',
    id,
    viewBox,
    width: attribute('width') ?? '',
    height: attribute('height') ?? '',
    body: inner.replace(/<defs>[\s\S]*?<\/defs>/, '').trim(),
    defs: defs.trim(),
  }
}

const badgesByName = new Map(
  Object.entries(sources).map(([path, source]) => {
    const name = path.replace(/^.*\/|\.svg$/g, '')
    return [name, parseBadge(name, source)]
  }),
)

/** Every badge SVG, sorted by display name. */
export const allBadges = [...badgesByName.values()].sort((a, b) =>
  a.label.localeCompare(b.label),
)

const toFormatKey = (format: string) =>
  format.toLowerCase().replace(/[^a-z0-9]+/g, '')

// A badge's display label always resolves to it, whatever the data calls it.
const badgesByLabelKey = new Map(
  allBadges.map((badge) => [toFormatKey(badge.label), badge]),
)

export const getBadge = (format: string): Badge | undefined => {
  const key = toFormatKey(format)
  const name = badgeFiles[key as keyof typeof badgeFiles]
  return (name && badgesByName.get(name)) || badgesByLabelKey.get(key)
}

/** Unique badges for the given formats, for rendering one sprite per page. */
export const getBadges = (formats: Iterable<string>): Badge[] => [
  ...new Set(
    Array.from(formats, getBadge).filter(
      (badge): badge is Badge => badge !== undefined,
    ),
  ),
]

/**
 * Whether a format describes the auditorium rather than the presentation.
 * The data lists some of these (e.g. Clubhouse) under formats.
 */
export const isFeatureFormat = (format: string) =>
  getBadge(format)?.category === 'feature'
