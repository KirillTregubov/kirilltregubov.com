import { useState } from 'react'
import type { InferGetStaticPropsType } from 'next'
import cn from 'classnames'
import { pick } from '@contentlayer/utils'
import { BlogPost, allBlogPosts } from 'contentlayer/generated'
import { SearchIcon } from '@heroicons/react/solid'

import Layout from 'layouts/layout'
import BlogPreview from 'components/BlogPreview'

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
      <h1>My Blog</h1>
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
          className={cn(
            'block w-full rounded-lg border border-neutral-300 bg-white pl-8 text-neutral-900 shadow outline-none placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-400/70 dark:focus:border-neutral-100 dark:focus:ring-neutral-100'
          )}
        />
      </div>
      <div>
        <h2>Search by topic</h2>
        <div></div>
      </div>
      {!filteredBlogPosts.length && (
        <p className="mb-4 text-gray-600 dark:text-gray-400">No posts found.</p>
      )}
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

  return { props: { posts } }
}
