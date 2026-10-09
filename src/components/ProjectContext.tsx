import { useStore } from '@nanostores/react'
import { interactiveButtonClass } from '@styles/classes'
import { ChevronRightIcon } from 'lucide-react'
import { atom } from 'nanostores'

const showAll = atom(false)

export function ProjectTitle() {
  const $showAll = useStore(showAll)

  return (
    <div>
      <h2 className="text-xl leading-none font-semibold">
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
      type="button"
      onClick={() => showAll.set(!$showAll)}
      className={`${interactiveButtonClass} -mx-2 -my-1 inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-sm px-2 py-1 font-medium select-none hover:text-white focus-visible:text-white active:text-white`}
    >
      {$showAll ? 'Show Featured' : 'Show All'}
      <ChevronRightIcon
        className={`size-4 -translate-y-px transition-transform ${$showAll ? 'rotate-90' : ''}`}
      />
    </button>
  )
}

export function ProjectList({ children }: { children: React.ReactNode }) {
  const $showAll = useStore(showAll)

  return <div className={$showAll ? '' : 'show-featured'}>{children}</div>
}
