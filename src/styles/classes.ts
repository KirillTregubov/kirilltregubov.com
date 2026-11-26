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
