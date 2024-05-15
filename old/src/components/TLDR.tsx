const TLDR: React.FC<{ content: string }> = ({ content }) => {
  return (
    <p className="lead">
      <span
        title="Too Lazy; Didn't Read"
        className="mr-1 cursor-help rounded-md bg-accent-500/40 p-1 px-2 font-medium text-accent-800 dark:bg-accent-600/40 dark:text-accent-200"
      >
        TL;DR
      </span>
      {content}
    </p>
  )
}

export default TLDR
