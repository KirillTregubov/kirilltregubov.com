import { useState } from 'react'
import type { InferGetStaticPropsType } from 'next'
import cn from 'classnames'
import { pick } from '@contentlayer/utils'
import { allBlogPosts } from 'contentlayer/generated'
import { SearchIcon } from '@heroicons/react/solid'

import Layout from 'layouts/layout'
import BlogPreview from 'components/BlogPreview'
import Void from 'components/illustrations/Void'

const Blog: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts
}) => {
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
      post.description.toLowerCase().includes(searchValue.toLowerCase())
  )

  return (
    <Layout>
      <h1 className="mt-6 text-2xl font-bold">My Blog</h1>
      <div className="relative my-4 w-full">
        <div className="absolute inset-y-0 ml-2 flex items-center">
          <SearchIcon
            className={cn(
              !!searchValue.length
                ? 'text-neutral-900 dark:text-neutral-100'
                : 'text-neutral-400 dark:text-neutral-400/70',
              'h-5 w-5 transition'
            )}
          />
        </div>
        <input
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search posts"
          aria-label="Search posts"
          className="block w-full rounded-lg border border-neutral-300 bg-white  pl-8 text-neutral-900 shadow transition  placeholder:text-neutral-400 focus:border-transparent dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-400/70"
        />
      </div>
      <div>
        <h2>Search by topic</h2>
        <div></div>
      </div>
      {!filteredBlogPosts.length && (
        <div className="mt-3 flex flex-col items-center">
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            <Void className="h-44 w-full text-accent-500" />
            <p className="mt-3">No posts matched your criteria.</p>
          </p>
        </div>
      )}
      {/* {(filteredBlogPosts.length == 0 || searchValue.length == 0) && (
        <div>
          <h2 className="flex flex-col items-center text-red-500">
            Recommended Posts
          </h2>
        </div>
      )} */}
      {filteredBlogPosts.map((post) => (
        <BlogPreview key={post.title} {...post} />
      ))}
    </Layout>
  )
}

export default Blog

export const getStaticProps = async () => {
  const posts = allBlogPosts
    .map((post) =>
      pick(post, ['slug', 'title', 'description', 'published_time'])
    )
    .sort(
      (a, b) =>
        Number(new Date(b.published_time)) - Number(new Date(a.published_time))
    )
  // const topics = allTopics

  return { props: { posts } }
}
