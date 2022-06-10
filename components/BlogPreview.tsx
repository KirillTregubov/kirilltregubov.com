import Link from 'next/link'

type Props = {
  title: string
  description: string
  slug: string
}

export default function BlogPreview({ title, description, slug }: Props) {
  return (
    <Link href={`/blog/${slug}`}>
      <a className="my-2 w-full border-2">
        <div>{title}</div>
        <div>{description}</div>
      </a>
    </Link>
  )
}
