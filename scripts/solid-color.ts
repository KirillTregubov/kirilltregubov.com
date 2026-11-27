#!/usr/bin/env bun
/**
 * Flattens translucent colours into the solid colour the browser paints, for
 * `solidColors` in src/styles/classes.ts.
 *
 *   bun solid <surface> <layer> [<layer> ...]
 *
 * List colours bottom to top. Each is a Tailwind colour name (`neutral-900`,
 * `white`), a hex colour or an `oklch()` value, with an optional `/alpha`
 * percentage as in Tailwind (`white/4`, `neutral-950/60`). Prints every step,
 * so a chip on a tile on the page gives the tile and the chip.
 *
 *   bun solid neutral-900 neutral-950/60 white/4
 */
import { readFileSync } from 'node:fs'

type Rgb = [number, number, number] // gamma-encoded sRGB, 0–1

const theme = readFileSync(
  new URL('../node_modules/tailwindcss/theme.css', import.meta.url),
  'utf8',
)

const oklchToRgb = (l: number, c: number, h: number): Rgb => {
  const a = c * Math.cos((h * Math.PI) / 180)
  const b = c * Math.sin((h * Math.PI) / 180)
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3
  const linear = [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ]
  return linear.map((v) => {
    const x = Math.min(Math.max(v, 0), 1)
    return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055
  }) as Rgb
}

const rgbToOklch = (rgb: Rgb): [number, number, number] => {
  const [r, g, b] = rgb.map((v) =>
    v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4,
  )
  const l_ = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m_ = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s_ = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const l = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const bb = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_
  const c = Math.hypot(a, bb)
  const h = ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360
  return [l, c, h]
}

const parseOklch = (value: string) => {
  const match = value.match(/oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+|none)/)
  if (!match) return undefined
  const l = Number(match[1]) / (match[2] ? 100 : 1)
  const h = match[4] === 'none' ? 0 : Number(match[4])
  return oklchToRgb(l, Number(match[3]), h)
}

const parseColor = (input: string): { rgb: Rgb; alpha: number } => {
  const [, name, alpha] = input.match(/^(.+?)(?:\/([\d.]+))?$/)!
  const opacity = alpha === undefined ? 1 : Number(alpha) / 100
  if (name === 'white') return { rgb: [1, 1, 1], alpha: opacity }
  if (name === 'black') return { rgb: [0, 0, 0], alpha: opacity }
  if (name.startsWith('#')) {
    const hex = name.length === 4 ? name.replace(/\w/g, '$&$&') : name
    const rgb = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    return { rgb: rgb as Rgb, alpha: opacity }
  }
  const declared = theme.match(new RegExp(`--color-${name}:\\s*([^;]+);`))?.[1]
  const rgb = parseOklch(declared ?? name)
  if (!rgb) throw new Error(`Unknown colour: ${input}`)
  return { rgb, alpha: opacity }
}

const format = (rgb: Rgb) => {
  const [l, c, h] = rgbToOklch(rgb)
  const lightness = `${+(l * 100).toFixed(2)}%`
  const value =
    c < 0.0005
      ? `oklch(${lightness} 0 0)`
      : `oklch(${lightness} ${+c.toFixed(4)} ${+h.toFixed(2)})`
  const hex = `#${rgb.map((v) => Math.round(v * 255).toString(16).padStart(2, '0')).join('')}`
  return { value, tailwind: `[${value.replaceAll(' ', '_')}]`, hex }
}

const [surface, ...layers] = process.argv.slice(2)
if (!surface || layers.length === 0) {
  console.error('Usage: bun solid <surface> <layer> [<layer> ...]')
  console.error('Example: bun solid neutral-900 neutral-950/60 white/4')
  process.exit(1)
}

let current = parseColor(surface).rgb
for (const layer of layers) {
  const { rgb, alpha } = parseColor(layer)
  current = current.map((under, i) => alpha * rgb[i] + (1 - alpha) * under) as Rgb
  const { value, tailwind, hex } = format(current)
  console.log(`${layer.padEnd(16)} ${value.padEnd(30)} ${hex}  ${tailwind}`)
}
