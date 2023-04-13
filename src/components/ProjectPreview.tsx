import { useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import type { Image as ImageType } from 'contentlayer/generated'
import {
  CodeBracketIcon,
  LinkIcon,
  LockClosedIcon
} from '@heroicons/react/20/solid'
import { useTheme } from 'next-themes'

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
      <div className="w-full">
        <div className="w-full flex-shrink-0 overflow-clip rounded-xl bg-neutral-800 object-contain">
          <Image
            className={clsx(loaded && 'unblur', 'select-none')}
            src={
              !!image?.path && !error
                ? `/static/images/projects/${image?.path}`
                : '/static/images/placeholder.jpg'
            }
            alt={image?.alt || 'Placeholder project image'}
            placeholder="blur"
            width={1200}
            height={630}
            blurDataURL={blurDataURL}
            onError={() => setError(true)}
            onLoadingComplete={() => setLoaded(true)}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-x-2.5">
          <div className="flex flex-wrap gap-x-2 gap-y-1.5">
            <h2 className="text-lg font-semibold">{name}</h2>
            {technologies.map((tech) => (
              <h3
                key={tech}
                className="color-bg-transition whitespace-nowrap rounded bg-neutral-200 px-2 leading-relaxed text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300"
              >
                {tech}
              </h3>
            ))}
          </div>
        </div>
        <div className="mt-3">{description}</div>
        {(source || demo) && (
          <div className="mt-2 flex items-center gap-2">
            {source === 'closed' && (
              <button
                disabled
                aria-disabled="true"
                className="py-1.5 pr-2 flex cursor-not-allowed items-center font-medium leading-none disabled:opacity-80"
              >
                <LockClosedIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
                <div>Closed Source</div>
              </button>
            )}
            {source && source !== 'closed' && (
              <a
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center rounded-lg border-2 border-neutral-500 px-3 py-1.5 leading-none text-neutral-700 transition-colors hover:border-neutral-700 hover:text-neutral-900 dark:border-neutral-500 dark:text-neutral-300 dark:hover:border-neutral-100 dark:hover:text-neutral-50"
              >
                <CodeBracketIcon
                  className="mr-1.5 h-5 w-5"
                  aria-hidden="true"
                />
                Source Code
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center rounded-lg border-2 border-neutral-500 px-3 py-1.5 leading-none text-neutral-700 transition-colors hover:border-neutral-700 hover:text-neutral-900 dark:border-neutral-500 dark:text-neutral-300 dark:hover:border-neutral-100 dark:hover:text-neutral-50"
              >
                <LinkIcon className="mr-1.5 h-5 w-5" aria-hidden="true" />
                Demo
              </a>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default ProjectPreview
