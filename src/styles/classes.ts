export const interactiveButtonClass =
  'transition duration-150 will-change-transform active:scale-[0.98]'

export type ButtonVariant = 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'icon'

const buttonBaseClass = `${interactiveButtonClass} inline-flex shrink-0 cursor-pointer items-center justify-center gap-1.5 font-medium select-none disabled:pointer-events-none disabled:opacity-60`

const buttonVariantClasses: Record<ButtonVariant, string> = {
  // Bordered, filled control: filters, toggles, sort, external actions.
  secondary:
    'rounded-lg border border-neutral-700 bg-neutral-800 text-neutral-300 hover:border-neutral-600 hover:bg-neutral-700 hover:text-white focus-visible:border-neutral-600 focus-visible:bg-neutral-700 focus-visible:text-white active:border-neutral-500 active:bg-neutral-600 active:text-white aria-pressed:border-neutral-500 aria-pressed:bg-neutral-700 aria-pressed:text-white',
  // Text-only action: header nav, "Show All". Negative margin keeps the text
  // aligned with surrounding content while the focus ring gets some room.
  ghost:
    '-mx-1 rounded-sm px-1 hover:text-white focus-visible:text-white active:text-white',
}

// Only applies to `secondary`.
const buttonSizeClasses: Record<ButtonSize, string> = {
  sm: 'px-2.5 py-1 text-sm',
  md: 'px-2.5 py-1.5',
  icon: 'p-2',
}

/** Class string for the shared button styles, for markup that can't use `<Button>` (React, scripts). */
export function buttonClass({
  variant = 'secondary',
  size = 'md',
}: { variant?: ButtonVariant; size?: ButtonSize } = {}) {
  return [
    buttonBaseClass,
    buttonVariantClasses[variant],
    variant === 'secondary' ? buttonSizeClasses[size] : '',
  ].join(' ')
}

/**
 * Text input styles. Heights match `buttonClass({ size: 'md' })`, so inputs
 * and buttons line up in a row. Horizontal padding is left to the caller
 * (`inputPaddingClass`) so a leading icon can widen the left side.
 */
export const inputClass =
  'w-full rounded-lg border border-neutral-700 bg-neutral-800 py-1.5 text-base text-neutral-100 transition outline-none placeholder:text-neutral-400 placeholder:select-none selection:bg-neutral-300 selection:text-neutral-950 hover:border-neutral-600 hover:bg-neutral-700 focus-visible:border-neutral-600 focus-visible:bg-neutral-700 active:border-neutral-500 active:bg-neutral-600 disabled:pointer-events-none disabled:opacity-60'

export const inputPaddingClass = {
  default: 'px-2.5',
  withIcon: 'pr-2.5 pl-8',
}

/**
 * Solid stand-ins for translucent colours.
 *
 * A translucent colour is blended with whatever is behind it on every frame,
 * so content that fades in (the `enter` utilities) can visibly re-blend and
 * stutter. Each value here is the translucent class flattened onto the
 * surface it sits on, so it looks identical once settled but paints as one
 * solid colour.
 *
 * Each comment names the class it replaces, then the layers it was computed
 * from, bottom to top. Recompute or add one with `bun solid`, passing those
 * layers (theme names, hex or oklch, with Tailwind's /alpha):
 *
 *   bun solid neutral-900 neutral-950/60 white/4
 *
 * Write each class out in full: Tailwind only generates classes it can see.
 * Interactive states (hover, active, focus rings) and anything over images,
 * gradients or shadows stay translucent.
 */
export const solidColors = {
  /** Post cards (BlogPreviewCard), on the page. */
  blogPreviewCard: {
    background: 'bg-[oklch(22.47%_0_0)]', // bg-neutral-800/30 (neutral-900 neutral-800/30)
    border: 'border-[oklch(31.46%_0_0)]', // border-neutral-700/60 (neutral-900 neutral-800/30 neutral-700/60)
    // hover:/focus-visible:bg-neutral-800/60 (neutral-900 neutral-800/60)
    hoverBackground:
      'hover:bg-[oklch(24.39%_0_0)] focus-visible:bg-[oklch(24.39%_0_0)]',
  },

  /** Saved item cards (/saved), on the page. */
  savedCard: {
    background: 'bg-[oklch(22.47%_0_0)]', // bg-neutral-800/30 (neutral-900 neutral-800/30)
    border: 'border-[oklch(31.46%_0_0)]', // border-neutral-700/60 (neutral-900 neutral-800/30 neutral-700/60)
    // hover:/focus-visible:bg-neutral-800/60 (neutral-900 neutral-800/60)
    hoverBackground:
      'hover:bg-[oklch(24.39%_0_0)] focus-visible:bg-[oklch(24.39%_0_0)]',
  },

  /** The "no posts found" box on /blog, on the page. */
  blogNoResultsBorder: 'border-[oklch(34.8%_0_0)]', // border-white/15 (neutral-900 white/15)

  /** Blog series navigation. `…` = neutral-900 neutral-800/30, the panel. */
  seriesNav: {
    panelBackground: 'bg-[oklch(22.47%_0_0)]', // bg-neutral-800/30 (neutral-900 neutral-800/30)
    buttonBackground: 'bg-[oklch(25.59%_0_0)]', // bg-neutral-800/70 (neutral-900 neutral-800/30 neutral-800/70)
    listBackground: 'bg-[oklch(21.69%_0_0)]', // bg-neutral-900/40 (neutral-900 neutral-800/30 neutral-900/40)
    listBorder: 'border-[oklch(26.39%_0_0)]', // border-neutral-800/90 (… neutral-900/40 neutral-800/90)
    currentBackground: 'bg-[oklch(22.58%_0.0252_35.91)]', // bg-orange-950/30 (… neutral-900/40 orange-950/30)
    currentBadgeBackground: 'bg-[oklch(32.83%_0.0717_48.25)]', // bg-orange-500/20 (… orange-950/30 orange-500/20)
    currentText: 'text-[oklch(72.46%_0.1078_66.52)]', // text-orange-300/80 (… orange-950/30 orange-300/80)
  },

  /** Badge tiles (/resources/cineplex-badges), on the page. */
  badgeTile: {
    background: 'bg-[oklch(16.96%_0_0)]', // bg-neutral-950/60 (neutral-900 neutral-950/60)
    border: 'border-[oklch(25.38%_0_0)]', // border-white/8 (neutral-900 neutral-950/60 white/8)
  },

  /** Experience chips on a badge tile. `…` = neutral-900 neutral-950/60. */
  badgeTileChips: {
    format: {
      background: 'bg-[oklch(21.28%_0_0)]', // bg-white/4 (neutral-900 neutral-950/60 white/4)
      border: 'border-[oklch(30.86%_0_0)]', // border-white/10 (… white/4 white/10)
    },
    feature: {
      background: 'bg-[oklch(19.24%_0_0)]', // bg-neutral-500/5 (neutral-900 neutral-950/60 neutral-500/5)
      border: 'border-[oklch(25.4%_0_0)]', // border-neutral-500/15 (… neutral-500/5 neutral-500/15)
    },
  },

  /** Hero on /cineplex-toronto. */
  cineplexHero: {
    background: '[--hero-background:oklch(16.97%_0.0187_50.75)]', // bg-[#160d08]
    statsBorder: 'border-[oklch(27.29%_0.0147_50.82)]', // border-white/10 (hero background white/10)
  },

  /** The "no theatres found" box on /cineplex-toronto, on the page. */
  cineplexNoResultsBorder: 'border-[oklch(34.8%_0_0)]', // border-white/15 (neutral-900 white/15)

  /** Theatre cards (/cineplex-toronto). `card` = 'oklch(16.38% 0 0)', their background. */
  theatreCard: {
    border: 'border-[oklch(26.91%_0_0)]', // border-white/10 (card white/10)
    headerBorder: 'border-[oklch(24.9%_0_0)]', // border-white/8 (card white/8)
    rowBorder: 'border-[oklch(23.88%_0_0)]', // border-white/7 (card white/7)
    areaText: 'text-[oklch(75.21%_0.1428_92.18)]', // text-amber-300/80 (card amber-300/80)
    notesBackground: 'bg-[oklch(19.93%_0.0127_94.39)]', // bg-amber-300/4 (card amber-300/4)
    notesBorder: 'border-[oklch(28.03%_0.037_94.32)]', // border-amber-300/10 (card amber-300/4 amber-300/10)
    notesHeading: 'text-[oklch(72.93%_0.0922_95.73)]', // text-amber-200/70 (card amber-300/4 amber-200/70)
    notesBullet: 'before:text-[oklch(63.11%_0.1174_92.54)]', // before:text-amber-300/60 (card amber-300/4 amber-300/60)
  },

  /** Experience chips on a theatre card. `card` = 'oklch(16.38% 0 0)'. */
  theatreCardChips: {
    format: {
      background: 'bg-[oklch(20.75%_0_0)]', // bg-white/4 (card white/4)
      border: 'border-[oklch(30.43%_0_0)]', // border-white/10 (card white/4 white/10)
    },
    feature: {
      background: 'bg-[oklch(18.7%_0_0)]', // bg-neutral-500/5 (card neutral-500/5)
      border: 'border-[oklch(24.98%_0_0)]', // border-neutral-500/15 (card neutral-500/5 neutral-500/15)
    },
  },

  /** Small labels on the Cineplex hero ticket. */
  // opacity-50 / opacity-55 on text-amber-950, raised to 65% for 4.5:1 contrast
  // ('oklch(94.3% 0.0895 95.6815)' amber-950/65)
  ticketLabel: 'text-[oklch(52.72%_0.0719_68.62)]',

  /** OverBuddy pages, on the page. */
  overBuddy: {
    noticeBackground: 'bg-[oklch(28.41%_0.0282_94.48)]', // bg-amber-300/10 (neutral-900 amber-300/10)
    noticeBorder: 'border-[oklch(47.97%_0.081_93.52)]', // border-amber-300/30 (neutral-900 amber-300/10 amber-300/30)
    noticeTitle: 'text-[oklch(80.81%_0.1037_95.7)]', // text-amber-200/80 (neutral-900 amber-300/10 amber-200/80)
    noticeText: 'text-[oklch(86%_0.0227_95.44)]', // text-amber-50/80 (neutral-900 amber-300/10 amber-50/80)
    noticeTextMuted: 'text-[oklch(83.95%_0.0532_95.53)]', // text-amber-100/80 (neutral-900 amber-300/10 amber-100/80)
    orangeButtonBorder: 'border-[oklch(60.95%_0.1843_41.88)]', // border-orange-800/40 (orange-500 orange-800/40)
    greyButtonBorder: 'border-[oklch(33.12%_0_0)]', // border-neutral-800/40 (neutral-700 neutral-800/40)
    greyButtonBorderDark: 'border-[oklch(30.74%_0_0)]', // border-neutral-900/40 (neutral-700 neutral-900/40)
    removedText: 'text-[oklch(59.98%_0.1209_83.7)]', // text-amber-400/60 (neutral-900 amber-400/60)
    availableTagBorder: 'border-[oklch(90.47%_0.1448_94.53)]', // border-amber-200/60 (amber-300 amber-200/60)
  },

  /** The hello player embed, on bg-neutral-900. */
  helloPlayerDivider: 'border-[oklch(32.36%_0_0)]', // border-neutral-700/70 (neutral-900 neutral-700/70)
} as const
