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
              ? 'font-semibold text-neutral-800 dark:text-neutral-300'
              : 'font-normal',
            'hidden rounded-md p-1 transition hover:bg-neutral-200 dark:hover:bg-neutral-800 sm:px-4 sm:py-2 md:inline-block'
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
  const [selected, setSelected] = useState(false)
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
            'flex items-center justify-center rounded-full p-2 transition hover:translate-y-[0.05rem] hover:scale-[0.85] hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50'
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
    <div className="relative bg-stone-50 dark:bg-stone-900">
      <nav className="m-auto flex max-w-4xl select-none justify-between px-6 py-4 text-neutral-600 dark:text-neutral-400">
        {/* dark:text-neutral-400 */}
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
          <NavLink href="/portfolio" title="Portfolio" />
          <NavLink href="/blog" title="Blog" />
          <NavLink href="/snippets" title="Snippets" />
        </ul>
        <ThemeSwitcher />
      </nav>
    </div>
  )
}

export default Navbar
