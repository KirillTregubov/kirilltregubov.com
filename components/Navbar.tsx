import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import cn from 'classnames'
import { MoonIcon, SunIcon } from '@heroicons/react/solid'

export type NavLinkProps = {
  href: string
  title: string
}

function NavLink({ href, title }: NavLinkProps) {
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
            'hidden rounded-md p-1 transition-all hover:bg-neutral-200 dark:hover:bg-neutral-800 sm:px-4 sm:py-2 md:inline-block'
          )}
        >
          {title}
        </a>
      </NextLink>
    </li>
  )
}

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  return (
    <div className="relative bg-neutral-100 dark:bg-neutral-900">
      <nav className="m-auto flex max-w-4xl select-none justify-between px-6 py-4 text-neutral-700 dark:text-neutral-400">
        <a
          href="#content"
          className="absolute left-4 -top-8 z-10 -translate-y-8 transform rounded-md bg-neutral-50 px-4 py-2 transition-all duration-200 focus:top-1 focus:translate-y-3 focus:outline-none focus:ring-2 focus:ring-neutral-700 dark:bg-neutral-900 dark:focus:ring-neutral-300"
        >
          Skip to content
        </a>
        <ul className="flex gap-1">
          <NavLink href="/" title="Home" />
          <NavLink href="/portfolio" title="Portfolio" />
          <NavLink href="/blog" title="Blog" />
          <NavLink href="/snippets" title="Snippets" />
        </ul>
        <button
          aria-label="Toggle Theme"
          type="button"
          className="flex items-center justify-center rounded-full p-2 transition-all hover:scale-125 hover:bg-neutral-200 hover:text-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {mounted && (
            <>
              {theme === 'dark' ? (
                <SunIcon className="h-6 w-6" />
              ) : (
                <MoonIcon className="h-6 w-6" />
              )}
            </>
          )}
        </button>
      </nav>
    </div>
  )
}
