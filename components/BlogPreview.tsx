import Link from 'next/link'
import Image from 'next/image'
import { ClipboardCopyIcon } from '@heroicons/react/solid'
import type { Image as ImageType } from 'contentlayer/generated'
import type { ReadTimeResults } from 'reading-time'

const BlogPreview: React.FC<{
  slug: string
  title: string
  description: string
  image: ImageType
  topics: string[]
  readingTime: ReadTimeResults
}> = ({ slug, title, description, image, topics, readingTime }) => {
  return (
    <Link href={`/blog/${slug}`}>
      <a className="my-2 flex w-full">
        <div className="mr-3 w-64 flex-shrink-0">
          <Image
            className="aspect-h-4 aspect-w-3 rounded-xl object-cover object-center"
            title={title}
            src={`/static/images/${image.path}`}
            alt={image.alt}
            layout="responsive"
            width={1200}
            height={630}
          />
        </div>
        <div className="">
          <div className="mb-1">{title}</div>
          <div className="mb-1">{description}</div>
          {/* <a title="Copy to clipboard" className=""> */}
          <div>{topics}</div>
          <div>{readingTime.text}</div>
          <ClipboardCopyIcon className="h-8 w-8 rounded-md bg-black p-2 text-white" />
          {/* </a> */}
        </div>
      </a>
    </Link>
  )
}

export default BlogPreview
