import { useRouter } from 'next/router'

const Footer: React.FC = () => {
  const { asPath: path } = useRouter()
  const isHome = path === '/'

  // NOTE: isHome
  return (
    <footer
      className={`select-none px-2 py-4 pt-8 text-center text-neutral-400 ${
        isHome && 'pb-20 md:pb-4'
      }`}
    >
      &copy; {new Date().getFullYear()} Kirill Tregubov. This site is{' '}
      <a
        rel="noopener noreferrer"
        href="https://github.com/KirillTregubov/kirilltregubov.com"
        target="_blank"
        className="underline underline-offset-2"
      >
        open source
      </a>
      .
    </footer>
  )
}

export default Footer
