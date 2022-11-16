import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import clsx from 'clsx'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

const NavLink: React.FC<{
  href: string
  title: string
}> = ({ href, title }) => {
  const { asPath: path } = useRouter()
  const isActive = path === href

  return (
    <li>
      <NextLink
        href={href}
        className={clsx(
          isActive &&
            'hvr-underline-from-center-active text-neutral-900 dark:!text-neutral-100',
          'hvr-underline-from-center hidden overflow-visible rounded-md p-1 font-medium text-neutral-500 transition hover:text-neutral-800 focus-visible:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-100 dark:focus-visible:text-neutral-300 sm:px-4 sm:py-2 md:inline-block'
        )}
      >
        {title}
      </NextLink>
    </li>
  )
}

const ThemeSwitcher: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {mounted && (
        <button
          aria-label="Toggle Theme"
          type="button"
          className={clsx(
            'group flex items-center justify-center rounded-full p-2 opacity-0 transition hover:bg-neutral-200 active:translate-y-[0.05rem] active:scale-[0.85] dark:hover:bg-neutral-700',
            mounted && '!opacity-100'
          )}
          onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
        >
          {resolvedTheme === 'dark' ? (
            <SunIcon className="group-focus-visible-visible:text-neutral-50 h-6 w-6 transition-colors group-hover:text-neutral-50" />
          ) : (
            <MoonIcon className="group-focus-visible-visible:text-neutral-900 h-6 w-6 transition-colors group-hover:text-neutral-900" />
          )}
        </button>
      )}
    </>
  )
}

const Navbar: React.FC = () => {
  return (
    <div className="sticky top-0 z-10 py-2 px-1.5">
      {/* <div className="frosted-glass absolute top-0 left-0 h-full w-full"></div> */}
      <nav className="relative m-auto flex max-w-[65rem] select-none items-center justify-between rounded-full border px-4 py-3 text-neutral-500/90 shadow transition-colors dark:border-neutral-700 dark:text-neutral-400/80">
        <div className="absolute -top-16 w-full">
          <a
            href="#content"
            className={clsx(
              'absolute z-10 -translate-y-8 transform rounded-md bg-neutral-50 px-4 py-2 text-neutral-800 transition-all duration-200 focus-visible:top-16 focus-visible:translate-y-3 dark:bg-neutral-900 dark:text-neutral-100 xl:-left-48'
            )}
          >
            Skip to content
          </a>
        </div>
        <ul className="flex gap-1">
          <NavLink href="/" title="Home" />
          <NavLink href="/blog" title="Blog" />
          <NavLink href="/resources" title="Resources" />
          <NavLink href="/explorer" title="Explorer" />
        </ul>
        <ThemeSwitcher />
      </nav>
    </div>
  )
}

export default Navbar
