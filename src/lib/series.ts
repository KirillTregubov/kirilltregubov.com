import type { CollectionEntry } from 'astro:content'

export type BlogPost = CollectionEntry<'blog'>
export type BlogSeries = NonNullable<BlogPost['data']['series']>

export type BlogSeriesNavigation = {
  id: BlogSeries['id']
  title: BlogSeries['title']
  members: BlogPost[]
  currentIndex: number
  previous: BlogPost | undefined
  next: BlogPost | undefined
}

/**
 * Resolve the navigation for the series containing `current`.
 *
 * The collection should be the same build-visible set used to generate the
 * current route (for example, after filtering drafts and hidden posts).
 * Series metadata is validated here because a collection schema cannot check
 * consistency across entries.
 */
export function resolveBlogSeries(
  current: BlogPost,
  collection: readonly BlogPost[],
): BlogSeriesNavigation | undefined {
  const currentSeries = current.data.series

  if (!currentSeries) {
    return undefined
  }

  const members = collection.filter(
    (entry) => entry.data.series?.id === currentSeries.id,
  )

  if (members.length === 0) {
    throw new Error(
      `Cannot resolve blog series "${currentSeries.id}": current entry "${current.id}" is not in the build-visible collection.`,
    )
  }

  const entriesByOrder = new Map<number, BlogPost>()

  for (const entry of members) {
    const entrySeries = entry.data.series

    // The filter above guarantees this for validated CollectionEntry values,
    // but retaining the guard keeps the resolver safe for hand-built callers.
    if (!entrySeries) {
      continue
    }

    if (entrySeries.title !== currentSeries.title) {
      throw new Error(
        `Blog series "${currentSeries.id}" has inconsistent titles: entry "${current.id}" uses "${currentSeries.title}", but entry "${entry.id}" uses "${entrySeries.title}".`,
      )
    }

    const previousEntry = entriesByOrder.get(entrySeries.order)

    if (previousEntry) {
      throw new Error(
        `Blog series "${currentSeries.id}" has duplicate order ${entrySeries.order} on entries "${previousEntry.id}" and "${entry.id}".`,
      )
    }

    entriesByOrder.set(entrySeries.order, entry)
  }

  // Entry ids are a stable, locale-independent tie-breaker. Duplicate order
  // values are rejected above, but the fallback keeps sorting deterministic if
  // this comparator is reused with an unvalidated collection in the future.
  const orderedMembers = [...members].sort((first, second) => {
    const firstOrder = first.data.series?.order ?? Number.POSITIVE_INFINITY
    const secondOrder = second.data.series?.order ?? Number.POSITIVE_INFINITY

    if (firstOrder !== secondOrder) {
      return firstOrder - secondOrder
    }

    return first.id < second.id ? -1 : first.id > second.id ? 1 : 0
  })

  const currentIndex = orderedMembers.findIndex(
    (entry) => entry.id === current.id,
  )

  if (currentIndex === -1) {
    throw new Error(
      `Cannot resolve blog series "${currentSeries.id}": current entry "${current.id}" is not in the build-visible collection.`,
    )
  }

  return {
    id: currentSeries.id,
    title: currentSeries.title,
    members: orderedMembers,
    currentIndex,
    previous: orderedMembers[currentIndex - 1],
    next: orderedMembers[currentIndex + 1],
  }
}
