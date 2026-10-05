import type { ImageMetadata } from 'astro'

export const BLOG_SUBTITLE =
  "Notes on software development, interface design, and the projects I've built."

const blogImages = import.meta.glob<ImageMetadata>(
  '../../public/assets/blog/*.{jpg,jpeg,png,webp,avif}',
  { eager: true, import: 'default' },
)

export const resolveBlogImage = (url: string) => {
  const localImage = blogImages[`../../public${url}`]
  return localImage ? { src: localImage } : { src: url }
}
