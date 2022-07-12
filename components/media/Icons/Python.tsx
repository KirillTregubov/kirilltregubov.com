import { useId } from 'react'

const Python: React.FC = (props) => {
  const id = useId()

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      width="1em"
      height="1em"
      role="img"
      {...props}
    >
      <defs>
        <mask id={id}>
          <rect x={10} width={20} height={40} rx={10} ry={5} fill="#fff" />
          <rect y={10} width={40} height={20} rx={5} ry={10} fill="#fff" />
          <circle cx={14.5} cy={5} r={1.85} fill="#000" />
          <circle cx={25.5} cy={35} r={1.85} fill="#000" />
          <path stroke="#000" d="M10 9.5h10m0 21h10" />
          <path
            d="M9.5 30c0-10 2.5-10 10-10 8.5 0 11 0 11-10"
            stroke="#000"
            fill="none"
          />
        </mask>
      </defs>
      <path mask={`url(#${id})`} fill="currentColor" d="M0 0h40v40H0z" />
    </svg>
  )
}

export default Python
