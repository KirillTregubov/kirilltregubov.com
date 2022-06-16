import Link from 'next/link'
import { ClipboardCopyIcon } from '@heroicons/react/solid'

const BlogPreview: React.FC<{
  title: string
  description: string
  slug: string
}> = ({ title, description, slug }) => {
  return (
    <Link href={`/blog/${slug}`}>
      <a className="my-2 w-full border-2 border-black">
        {/* Image */}
        <div>{title}</div>
        <div>{description}</div>
        {/* <a title="Copy to clipboard" className=""> */}
        <ClipboardCopyIcon className="h-8 w-8 rounded-md bg-black p-2 text-white" />
        {/* </a> */}
      </a>
    </Link>
  )
}

export default BlogPreview
