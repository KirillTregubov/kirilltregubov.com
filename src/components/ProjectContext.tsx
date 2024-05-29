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
          ? 'Projects I created and have contributed to that showcase my abilities.'
          : 'Projects I created and have contributed to that best showcase my abilities.'}
      </p>
    </div>
  )
}

export function ProjectToggle() {
  const $showAll = useStore(showAll)

  return (
    <button
      onClick={() => showAll.set(!$showAll)}
      className="-my-1 -mr-3 inline-flex flex-shrink-0 select-none items-center rounded-md px-3 py-1 font-medium transition-colors hover:text-neutral-400"
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
