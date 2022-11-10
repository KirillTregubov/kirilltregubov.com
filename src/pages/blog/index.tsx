import { useState } from 'react'
import type { InferGetStaticPropsType } from 'next'
import { compareDesc } from 'date-fns'
import clsx from 'clsx'
import { pick } from 'contentlayer/client'
import { allBlogPosts } from 'contentlayer/generated'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

import Layout from 'layouts/layout'
import BlogPreview from 'components/BlogPreview'
import { Void } from 'components/illustrations'
import { isProduction } from 'lib/isProduction'

const Blog: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
  topics
}) => {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.description.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <Layout>
      <h1 className="text-2xl font-bold">My Blog</h1>
      <p className="mt-1">
        My personal blog where I share structured content about what I'm
        learning and working on, along with other interesting information I want
        to share with the world.
      </p>
      <div className="relative mt-3 w-full transition-colors">
        <div className="absolute inset-y-0 ml-2 flex items-center">
          <MagnifyingGlassIcon
            className={clsx(
              !!searchValue.length
                ? 'text-neutral-900 dark:text-neutral-100'
                : 'text-neutral-400 dark:text-neutral-500',
              'h-5 w-5 transition-colors'
            )}
          />
        </div>
        <input
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search posts"
          aria-label="Search posts"
          className="block w-full rounded-lg border border-neutral-300 bg-white pl-8 font-medium text-neutral-900 shadow transition placeholder:text-neutral-400 focus:border-transparent dark:border-neutral-700 dark:bg-black dark:text-neutral-100 dark:placeholder:text-neutral-500"
        />
      </div>
      <div className="mt-3">
        <h2 className="font-medium">Search by topic</h2>
        <div className="mt-1 flex gap-x-2 gap-y-2">
          {topics.map((topic) => (
            <button
              key={topic}
              className="pressable rounded-full border border-neutral-300 bg-white px-5 py-2 transition-[background-color,border-color] dark:border-neutral-700 dark:bg-neutral-800"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
      {!filteredBlogPosts.length && (
        <div className="mt-8 flex flex-col items-center">
          <div className="text-neutral-600 dark:text-neutral-400">
            <Void className="h-44 w-full text-accent-500" />
            <p className="mt-3">No posts matched your criteria.</p>
          </div>
        </div>
      )}
      {/* TODO: {(filteredBlogPosts.length == 0 || searchValue.length == 0) && (
        <div>
          <h2 className="flex flex-col items-center text-red-500">
            Recommended Posts
          </h2>
        </div>
      )} */}
      <div className="mt-8 flex flex-col gap-5">
        {filteredBlogPosts.map((post) => (
          <BlogPreview key={post.title} {...post} />
        ))}
      </div>
    </Layout>
  )
}

export default Blog

export const getStaticProps = async () => {
  const posts = allBlogPosts
    .map((post) =>
      pick(post, [
        'slug',
        'title',
        'description',
        'status',
        'publishedTime',
        'modifiedTime',
        'image',
        'topics',
        'readingTime'
      ])
    )
    .filter((post) => (isProduction ? post.status === 'published' : true))
    .sort((a, b) =>
      compareDesc(new Date(a.publishedTime), new Date(b.publishedTime))
    )
  // TODO: Blog Article about how flatMap vs map work, why it was the better choice
  const topics = [...Array.from(new Set(posts.flatMap((post) => post.topics)))]

  console.log(isProduction)
  console.log(posts)
  return { props: { posts, topics } }
}
