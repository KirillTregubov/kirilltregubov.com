import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { ClipboardCopyIcon } from '@heroicons/react/solid'
import type { Image as ImageType } from 'contentlayer/generated'
import type { ReadTimeResults } from 'reading-time'

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const BlogPreview: React.FC<{
  slug: string
  title: string
  description: string
  image?: ImageType
  topics: string[]
  readingTime: ReadTimeResults
}> = ({ slug, title, description, image, topics, readingTime }) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <Link href={`/blog/${slug}`}>
      <a className="flex w-full">
        <div className="mr-3 w-64 flex-shrink-0">
          <Image
            className={clsx(
              loaded ? 'unblur' : '',
              'aspect-h-4 aspect-w-3 rounded-xl object-cover object-center'
            )}
            title={title}
            src={
              !!image?.path && !error
                ? `/static/images/${image?.path}`
                : '/static/images/placeholder.jpg'
            }
            alt={image?.alt}
            layout="responsive"
            width={1200}
            height={630}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(1200, 630)
            )}`}
            onError={() => setError(true)}
            onLoadingComplete={() => setLoaded(true)}
          />
        </div>
        <div className="">
          <div className="">{title}</div>
          <div className="mt-1">{description}</div>
          <div className="mt-1">{topics}</div>
          <div>{readingTime.text}</div>
          <ClipboardCopyIcon className="h-8 w-8 rounded-md bg-black p-2 text-white" />
        </div>
      </a>
    </Link>
  )
}

export default BlogPreview
