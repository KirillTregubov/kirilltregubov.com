import { useId } from 'react'

const IntelliJ: React.FC = (props) => {
  const id = useId()

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid"
      role="img"
      {...props}
    >
      <defs>
        <mask id={id}>
          <path fill="#fff" d="m64.8 199.6-62-48.8 30.8-57.2L122 128z" />
          <path
            fill="#fff"
            d="m256 68.4-4.8 148-98.4 39.6-59.2-38.4L180 128l-37.6-83.2 34-40.8z"
          />
          <path
            fill="#fff"
            d="M123.2 212.4 20.8 249.6 37.2 192l21.2-71.2L0 101.2 37.2 0l80 9.6 79.2 90.4z"
          />
          <path fill="#000" d="M48 48h160v160H48z" />
          <path
            d="M63.2 178h60v10h-60v-10ZM106 80.8v-12H73.2v12h9.2v42h-9.2v12.4H106v-12.4h-9.2v-42h9.2Zm32 55.2a26.84 26.84 0 0 1-13.2-2.8 31.48 31.48 0 0 1-8.8-7.2l9.2-10.4a29.88 29.88 0 0 0 5.6 4.8 11.72 11.72 0 0 0 6.4 1.6 7.44 7.44 0 0 0 6.4-2.8 11.72 11.72 0 0 0 2.4-8.4V68h14.8v43.2a27.08 27.08 0 0 1-1.6 10.4 20 20 0 0 1-5.6 8.8A28.6 28.6 0 0 1 138 136Z"
            fill="#fff"
          />
        </mask>
      </defs>
      <path mask={`url(#${id})`} fill="currentColor" d="M0 0h256v256H0z" />
    </svg>
  )
}

export default IntelliJ
