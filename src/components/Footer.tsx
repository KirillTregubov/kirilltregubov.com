const Footer: React.FC = () => {
  return (
    <footer className="select-none px-6 py-4 pt-8 text-center text-neutral-400">
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
