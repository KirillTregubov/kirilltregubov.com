import { useState } from 'react'
import Saturn from './Saturn'

const colors = [
  { name: 'Orange', dot: 'bg-orange-400', text: 'text-orange-400' },
  { name: 'Sky', dot: 'bg-sky-400', text: 'text-sky-400' },
  { name: 'Violet', dot: 'bg-violet-400', text: 'text-violet-400' },
]

const buttonClass =
  'inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-neutral-600 bg-neutral-800 px-4 font-medium text-neutral-100 transition hover:bg-neutral-700 active:scale-95 disabled:opacity-40 disabled:active:scale-100'

export default function PlayerPlayground() {
  const [count, setCount] = useState(0)
  const [enabled, setEnabled] = useState(true)
  const [color, setColor] = useState(0)

  return (
    <div className="space-y-4">
      <h1 className="text-sm font-medium text-neutral-400">Demo</h1>

      <section
        aria-labelledby="saturn-title"
        className="overflow-hidden rounded-2xl border border-neutral-700"
      >
        <div className="px-4 pt-4">
          <h2 id="saturn-title" className="font-semibold text-neutral-100">
            01 · Saturn in Three.js
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            Drag left or right to give it a spin.
          </p>
        </div>
        <div
          className="h-56 sm:h-64"
          role="img"
          aria-label="Rotating 3D Saturn model. Drag horizontally to spin. A static image appears when 3D is unavailable."
        >
          <Saturn />
        </div>
        <p className="px-4 pb-3 text-xs text-neutral-500">
          Model:{' '}
          <a
            className="underline underline-offset-2 hover:text-neutral-300"
            href="https://science.nasa.gov/resource/saturn-3d-model/"
            target="_blank"
            rel="noopener noreferrer"
          >
            NASA
          </a>{' '}
          · Static fallback on unsupported devices
        </p>
      </section>

      <section
        aria-labelledby="state-title"
        className="rounded-2xl border border-neutral-700 p-4"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 id="state-title" className="font-semibold text-neutral-100">
            02 · React state
          </h2>
          <button
            className="min-h-11 px-2 text-sm text-neutral-400 underline underline-offset-4 hover:text-white"
            onClick={() => {
              setCount(0)
              setEnabled(true)
              setColor(0)
            }}
          >
            Reset
          </button>
        </div>
        <div className="mt-2 flex items-center justify-center gap-5">
          <button
            className={buttonClass}
            aria-label="Decrease counter"
            disabled={!enabled}
            onClick={() => setCount((value) => value - 1)}
          >
            −
          </button>
          <output
            aria-live="polite"
            aria-label="Counter"
            className={`min-w-20 text-center text-5xl font-semibold tabular-nums ${colors[color].text}`}
          >
            {count}
          </output>
          <button
            className={buttonClass}
            aria-label="Increase counter"
            disabled={!enabled}
            onClick={() => setCount((value) => value + 1)}
          >
            +
          </button>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-700 pt-3">
          <button
            role="switch"
            aria-checked={enabled}
            aria-label="Enable counter"
            className={`${buttonClass} gap-2 text-sm`}
            onClick={() => setEnabled((value) => !value)}
          >
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${enabled ? 'bg-emerald-400' : 'bg-neutral-500'}`}
            />
            Counter {enabled ? 'on' : 'off'}
          </button>
          <div role="group" aria-label="Counter color" className="flex gap-1">
            {colors.map((item, index) => (
              <button
                key={item.name}
                aria-label={item.name}
                aria-pressed={color === index}
                onClick={() => setColor(index)}
                className={`flex size-11 items-center justify-center rounded-lg border transition hover:bg-neutral-800 ${color === index ? 'border-neutral-400 bg-neutral-800' : 'border-transparent'}`}
              >
                <span
                  aria-hidden="true"
                  className={`size-4 rounded-full ${item.dot}`}
                />
              </button>
            ))}
          </div>
        </div>
        <p className="mt-3 text-xs text-neutral-500">
          State lasts while this player is open.
        </p>
      </section>
    </div>
  )
}
