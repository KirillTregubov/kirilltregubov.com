import { atom } from 'nanostores'
import { useStore } from '@nanostores/react'
import { ChevronRightIcon } from 'lucide-react'

const showAll = atom(false)

export function ProjectToggle() {
  const $showAll = useStore(showAll)

  return (
    <button
      onClick={() => showAll.set(!$showAll)}
      className="-my-1 -mr-3 inline-flex flex-shrink-0 items-center rounded-md px-3 py-1 font-medium transition-colors hover:text-neutral-400"
    >
      {$showAll ? 'Show Featured' : 'Show All'}
      <ChevronRightIcon className="size-6" />
    </button>
  )
}

export function ShowFeatured({ children }: { children: React.ReactNode }) {
  const $showAll = useStore(showAll)

  return <>{$showAll ? null : children}</>
}

export function ShowAll({ children }: { children: React.ReactNode }) {
  const $showAll = useStore(showAll)

  return <>{$showAll ? children : null}</>
}
