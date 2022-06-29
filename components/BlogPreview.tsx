import Link from 'next/link'
import Image from 'next/image'
import { ClipboardCopyIcon } from '@heroicons/react/solid'
import { Image as ImageType } from 'contentlayer/generated'

const BlogPreview: React.FC<{
  title: string
  description: string
  slug: string
  image: ImageType
}> = ({ title, description, slug, image, imageAlt }) => {
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
          <ClipboardCopyIcon className="h-8 w-8 rounded-md bg-black p-2 text-white" />
          {/* </a> */}
        </div>
      </a>
    </Link>
  )
}

export default BlogPreview
