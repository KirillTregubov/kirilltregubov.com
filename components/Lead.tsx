type Props = {
  content: string
}

export default function Lead({ content }: Props) {
  return <p className="lead">{content}</p>
}
