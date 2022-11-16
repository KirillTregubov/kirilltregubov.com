import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import type { Image as ImageType } from 'contentlayer/generated'
import { ClipboardIcon } from '@heroicons/react/24/solid'
import type { ReadTimeResults } from 'reading-time'

import { blurDataURL } from 'lib/images'

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
    <Link href={`/blog/${slug}`} className="flex w-full flex-col sm:flex-row">
      <div className="mr-3 w-full flex-shrink-0 sm:w-72">
        <Image
          className={clsx(
            loaded && 'unblur',
            'aspect-auto rounded-xl object-cover object-center'
          )}
          src={
            !!image?.path && !error
              ? `/static/images/blog/${image?.path}`
              : '/static/images/placeholder.jpg'
          }
          alt={image?.alt || 'Placeholder blog post image'}
          width={1200}
          height={630}
          placeholder="blur"
          blurDataURL={blurDataURL}
          onError={() => setError(true)}
          onLoadingComplete={() => setLoaded(true)}
        />
      </div>
      <div className="">
        <div className="">{title}</div>
        <div className="mt-1">{description}</div>
        <div className="mt-1">{topics}</div>
        <div>{readingTime.text}</div>
        <ClipboardIcon className="h-8 w-8 rounded-md bg-black p-2 text-white" />
      </div>
    </Link>
  )
}

export default BlogPreview
