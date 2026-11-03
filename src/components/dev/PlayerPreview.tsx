import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Share,
} from 'lucide-react'
import { useEffect, useState } from 'react'

import type { PlayerDefinition } from '../../lib/players'

const sizes = [320, 360, 408, 480, 566, 640]

export default function PlayerPreview({
  players,
}: {
  players: PlayerDefinition[]
}) {
  const [size, setSize] = useState(566)
  const [selectedId, setSelectedId] = useState(players[0].id)
  const player = players.find((item) => item.id === selectedId) ?? players[0]

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('player')
    if (requested && players.some((item) => item.id === requested))
      setSelectedId(requested)
  }, [players])

  return (
    <div className="grid grid-cols-[10rem_minmax(0,1fr)] items-start gap-6">
      <aside
        aria-label="Player preview sizes"
        className="sticky top-6 space-y-2"
      >
        <a
          href="/dev/tools/players"
          className="mb-4 block text-sm text-neutral-400 underline underline-offset-4 hover:text-white"
        >
          Player gallery
        </a>
        <h2 className="mb-3 text-sm font-medium text-neutral-400">Player</h2>
        {players.map((item) => (
          <button
            key={item.id}
            aria-pressed={player.id === item.id}
            onClick={() => setSelectedId(item.id)}
            className="block w-full rounded-lg border border-neutral-800 px-3 py-2 text-left text-sm transition hover:bg-neutral-800 aria-pressed:border-neutral-500 aria-pressed:bg-neutral-800 aria-pressed:text-white"
          >
            {item.title}
          </button>
        ))}
        <a
          href={player.sharePath}
          target="_blank"
          rel="noopener noreferrer"
          className="block py-2 text-xs text-neutral-500 underline underline-offset-4"
        >
          Share URL: {player.sharePath}
        </a>
        <h2 className="mb-3 text-sm font-medium text-neutral-400">
          Player size
        </h2>
        {sizes.map((value) => (
          <button
            key={value}
            aria-pressed={size === value}
            onClick={() => setSize(value)}
            className="block w-full rounded-lg border border-neutral-800 px-3 py-2 text-left text-sm transition hover:bg-neutral-800 aria-pressed:border-neutral-500 aria-pressed:bg-neutral-800 aria-pressed:text-white"
          >
            {value} × {value}
            {(value === 408 || value === 566) && (
              <span className="mt-0.5 block text-xs text-neutral-500">
                {value === 408 ? 'Your screenshot' : 'Codex measurement'}
              </span>
            )}
          </button>
        ))}
        <p className="pt-2 text-xs text-neutral-500">
          CSS pixels. Resizes the iframe without resetting its state.
        </p>
      </aside>
      <div className="min-w-0 overflow-x-auto">
        <p aria-live="polite" className="mb-3 text-sm text-neutral-400">
          {size} × {size} px · Actual size
        </p>
        <article
          aria-label="Tweet frame preview"
          style={{ width: size + 34 }}
          className="box-border border-x border-neutral-800 bg-black px-[15px] pb-4 font-[Arial,sans-serif] text-[15px] text-[#e7e9ea]"
        >
          <div className="flex h-[84px] items-center gap-2">
            <div
              aria-hidden="true"
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-neutral-800 font-bold"
            >
              {player.author.charAt(0)}
            </div>
            <div className="flex-1 leading-5">
              <p className="font-bold">{player.author}</p>
              <p className="text-[#71767b]">{player.handle}</p>
            </div>
            <MoreHorizontal size={20} aria-hidden="true" />
          </div>
          <div
            style={{ width: size, height: size }}
            className="box-content overflow-hidden rounded-2xl border border-[#2f3336] bg-black"
          >
            <iframe
              src={`/embed/${player.id}?autoplay=1&auto_play=true`}
              title={`X player preview at ${size} by ${size} pixels`}
              width={size}
              height={size}
              allow="autoplay; fullscreen; web-share"
              allowFullScreen
              style={{ width: size, height: size }}
              className="block max-w-none border-0 bg-neutral-900"
            />
          </div>
          <p className="mt-1 text-[13px] text-[#71767b]">
            From kirilltregubov.com
          </p>
          <p className="my-4 text-[#71767b]">3:24 AM · Oct 17, 2026</p>
          <div
            aria-hidden="true"
            className="flex justify-between border-t border-[#2f3336] pt-4 text-[#71767b]"
          >
            <MessageCircle size={20} />
            <Repeat2 size={20} />
            <Heart size={20} />
            <Bookmark size={20} />
            <Share size={20} />
          </div>
        </article>
      </div>
    </div>
  )
}
