import type { ImageMetadata } from 'astro'

// Images stay in `public/` so their original URLs keep working (downloads,
// generated OG images), but importing them lets `astro:assets` optimize them.
const publicImages = import.meta.glob<ImageMetadata>(
  [
    '../../public/assets/blog/*.{jpg,jpeg,png,webp,avif}',
    '../../public/assets/projects/**/*.{jpg,jpeg,png,webp,avif}',
  ],
  { eager: true, import: 'default' },
)

/** Returns local image metadata for a `/assets/...` URL, or `undefined`. */
export const getPublicImage = (url: string): ImageMetadata | undefined =>
  publicImages[`../../public${url.replace(/\?.*$/, '')}`]

/** Resolves a `/assets/...` URL to an optimizable `src` for `<Image>`. */
export const resolvePublicImage = (url: string) => {
  const image = getPublicImage(url)
  return image ? { src: image } : { src: url }
}
