import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import cn from 'classnames'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'

const NavLink: React.FC<{
  href: string
  title: string
}> = ({ href, title }) => {
  const { asPath: path } = useRouter()
  const isActive = path === href

  return (
    <li>
      <NextLink href={href}>
        <a
          className={cn(
            isActive
              ? 'hvr-underline-from-center-active text-neutral-800 dark:text-neutral-300'
              : '',
            'hvr-underline-from-center hidden overflow-visible rounded p-1 font-medium transition hover:text-neutral-800 focus:text-neutral-800 dark:hover:text-neutral-300 dark:focus:text-neutral-300 sm:px-4 sm:py-2 md:inline-block'
          )}
        >
          {title}
        </a>
      </NextLink>
    </li>
  )
}

const ThemeSwitcher: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      {mounted && (
        <button
          aria-label="Toggle Theme"
          type="button"
          className={cn(
            'flex items-center justify-center rounded-full p-2 transition hover:bg-neutral-200 hover:text-neutral-900 focus:text-neutral-900 active:translate-y-[0.05rem] active:scale-[0.85] dark:hover:bg-neutral-700 dark:hover:text-neutral-50 dark:focus:text-neutral-50'
          )}
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'dark' ? (
            <SunIcon className="h-6 w-6" />
          ) : (
            <MoonIcon className="h-6 w-6" />
          )}
        </button>
      )}
    </>
  )
}

const Navbar: React.FC = () => {
  return (
    <div className="relative bg-stone-100 transition-colors dark:bg-neutral-800">
      <nav className="m-auto flex max-w-4xl select-none justify-between px-6 py-4 text-neutral-500/80 dark:text-neutral-400/80">
        <a
          href="#content"
          className={cn(
            'absolute left-4 -top-8 z-10 -translate-y-8 transform rounded-md bg-neutral-50 px-4 py-2 text-neutral-800 transition-all duration-200 focus:top-1 focus:translate-y-3 dark:bg-neutral-900 dark:text-neutral-100'
          )}
        >
          Skip to content
        </a>
        <ul className="flex gap-1">
          <NavLink href="/" title="Home" />
          {/* <NavLink href="/portfolio" title="Portfolio" /> */}
          <NavLink href="/blog" title="Blog" />
          <NavLink href="/snippets" title="Snippets" />
          <NavLink href="/links" title="Links" />
        </ul>
        <ThemeSwitcher />
      </nav>
    </div>
  )
}

export default Navbar
