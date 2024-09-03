import { atom } from 'nanostores'
import { useStore } from '@nanostores/react'
import { ChevronRightIcon } from 'lucide-react'

const showAll = atom(false)

export function ProjectTitle() {
  const $showAll = useStore(showAll)

  return (
    <div>
      <h2 className="text-xl font-semibold leading-none">
        {$showAll ? 'All Projects' : 'Featured Projects'}
      </h2>
      <p className="mt-2 text-neutral-400">
        {$showAll
          ? 'Projects I have worked on that showcase my abilities.'
          : 'Projects I have worked on that best showcase my abilities.'}
      </p>
    </div>
  )
}

export function ProjectToggle() {
  const $showAll = useStore(showAll)

  return (
    <button
      onClick={() => showAll.set(!$showAll)}
      className="-mx-3 -my-1 inline-flex flex-shrink-0 select-none items-center rounded px-3 py-1 pr-1 font-medium transition-[color,box-shadow] hover:text-neutral-400 active:text-neutral-400"
    >
      {$showAll ? 'Show Featured' : 'Show All'}
      <ChevronRightIcon className="size-6" />
    </button>
  )
}

export function ShowFeatured({ children }: { children: React.ReactNode }) {
  const $showAll = useStore(showAll)

  return <div className={$showAll ? 'hidden' : ''}>{children}</div>
}

export function ShowAll({ children }: { children: React.ReactNode }) {
  const $showAll = useStore(showAll)

  return <div className={$showAll ? '' : 'hidden'}>{children}</div>
}
