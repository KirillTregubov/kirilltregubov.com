export type RevealSettings = {
  pattern:
    | 'cascade'
    | 'rows'
    | 'diagonal'
    | 'current'
    | 'ripple'
    | 'scatter'
    | 'shore'
    | 'swell'
    | 'crest'
    | 'ebb'
  unit: 'blocks' | 'items'
  easing: 'ease' | 'out' | 'expo' | 'back' | 'sine' | 'inout' | 'cubic'
  direction: 'up' | 'down' | 'left' | 'scale' | 'none'
  spread: number
  duration: number
  distance: number
  blur: number
}

export type RevealPreset = {
  id: string
  label: string
  hint: string
  settings: RevealSettings
}

export const revealPresets: RevealPreset[] = [
  {
    id: 'site',
    label: 'Site',
    hint: 'Live on the site: Tide · soft stop timing on sections, 70ms apart.',
    settings: {
      pattern: 'cascade',
      unit: 'blocks',
      easing: 'ease',
      direction: 'up',
      spread: 350,
      duration: 450,
      distance: 10,
      blur: 0,
    },
  },
  {
    id: 'site-today',
    label: 'Site today',
    hint: 'The previous entrance: sections 80ms apart, 600ms fades.',
    settings: {
      pattern: 'cascade',
      unit: 'blocks',
      easing: 'ease',
      direction: 'up',
      spread: 400,
      duration: 600,
      distance: 10,
      blur: 0,
    },
  },
  {
    id: 'tide',
    label: 'Tide',
    hint: 'Row by row, like a rising tide.',
    settings: {
      pattern: 'rows',
      unit: 'items',
      easing: 'out',
      direction: 'up',
      spread: 500,
      duration: 650,
      distance: 14,
      blur: 0,
    },
  },
  {
    id: 'tide-soft',
    label: 'Tide · soft stop',
    hint: 'Quick rows with ease-in-out, so the end settles without a tail.',
    settings: {
      pattern: 'rows',
      unit: 'items',
      easing: 'ease',
      direction: 'up',
      spread: 350,
      duration: 450,
      distance: 10,
      blur: 0,
    },
  },
]
