import { getTweet, type Tweet } from 'react-tweet/api'

const cache = new Map<string, Promise<Tweet | undefined>>()

/**
 * Fetches a post by its x.com/twitter.com status URL at build time, once per
 * URL, so /saved can render it as a static embed.
 */
export function fetchTweet(url: string): Promise<Tweet | undefined> {
  const id = url.match(/\/status\/(\d+)/)?.[1]
  if (!id) return Promise.resolve(undefined)

  let tweet = cache.get(id)
  if (!tweet) {
    tweet = getTweet(id).catch((error) => {
      console.warn(`[saved] Failed to fetch tweet ${id}:`, error)
      return undefined
    })
    cache.set(id, tweet)
  }
  return tweet
}
