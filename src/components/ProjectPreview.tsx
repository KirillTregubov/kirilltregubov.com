import { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import type { Image as ImageType } from 'contentlayer/generated'
import { CodeIcon, LinkIcon, LockClosedIcon } from '@heroicons/react/solid'

import type { allTechnologies } from 'lib/content'
import { blurDataURL } from 'lib/images'

const ProjectPreview: React.FC<{
  name: string
  description: string
  image: ImageType
  technologies: typeof allTechnologies[number][]
  source?: string
  demo?: string
}> = ({ name, description, image, technologies, source, demo }) => {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  return (
    <>
      <div className="flex w-full overflow-hidden rounded-xl border border-neutral-300 shadow transition-[border-color,background-color] dark:border-neutral-700">
        <div className="w-72 flex-shrink-0 bg-neutral-800">
          <div className="img-wrapper relative h-full w-full">
            <Image
              className={clsx(loaded && 'unblur', '')}
              src={
                !!image?.path && !error
                  ? `/static/images/blog/${image?.path}`
                  : '/static/images/placeholder.jpg'
              }
              alt={image?.alt}
              layout="responsive"
              objectFit="contain"
              placeholder="blur"
              width={1200}
              height={630}
              blurDataURL={blurDataURL}
              onError={() => setError(true)}
              onLoadingComplete={() => setLoaded(true)}
            />
          </div>
        </div>
        <div className="color-transition my-4 mx-4 w-full self-center text-neutral-900 dark:text-neutral-100">
          <div className="flex gap-2">
            {technologies.map((tech) => (
              <h3
                key={tech}
                className="color-bg-transition rounded bg-neutral-200 px-2 leading-relaxed text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
              >
                {tech}
              </h3>
            ))}
          </div>
          <h2 className="mt-3 text-xl font-semibold">{name}</h2>
          <div className="leading-snug">{description}</div>
          {(source || demo) && (
            <div className="mt-5 flex items-center justify-between">
              {source === 'closed' && (
                <button
                  disabled
                  aria-disabled="true"
                  className="flex cursor-not-allowed items-center font-medium leading-none disabled:opacity-80"
                >
                  <LockClosedIcon className="mr-1 h-4 w-4" aria-hidden="true" />
                  <div>Closed Source</div>
                </button>
              )}
              {source !== 'closed' && (
                <a
                  href={source}
                  target="_blank"
                  // rounded-lg bg-neutral-800 px-3.5 py-2 text-neutral-100
                  className="inline-link flex items-center leading-none"
                >
                  <CodeIcon className="mr-1 h-4 w-4" aria-hidden="true" />
                  Source Code
                </a>
              )}
              {demo && (
                <a
                  href={demo}
                  target="_blank"
                  className="inline-link flex items-center leading-none"
                >
                  <LinkIcon className="mr-1 h-4 w-4" aria-hidden="true" />
                  Demo
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProjectPreview
