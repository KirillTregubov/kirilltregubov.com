import { useId } from 'react'

const PyCharm: React.FC = (props) => {
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
          <path
            fill="#fff"
            d="m179.493 40.4 74.8 62.213-26.933 54.8-45.093-12.506h-39.014z"
          />
          <path
            fill="#fff"
            d="m104.133 80.8-14.48 76.613-1.386 26.027-36.507 15.813L0 204.827l15.707-165.52L109.493 0l57.787 37.893z"
          />
          <path
            fill="#fff"
            d="m104.133 80.8 7.04 147.627L87.787 256 0 204.827 72.08 97.413z"
          />
          <path fill="#fff" d="M200.72 70.027h-88.693L190.4 0z" />
          <path
            fill="#fff"
            d="m256 229.013-78.08 26.507-103.973-29.28L104.133 80.8l12.054-10.773 63.306-5.947-5.733 63.573 50.347-19.52z"
          />
          <path fill="#000" d="M48 48h160v160H48z" />
          <path
            d="M67.947 177.76h60v10h-60v-10ZM68 68h24.533c14.15 0 22.786 8.311 22.958 20.354l.002.526c0 13.867-10.8 21.067-24.24 21.067h-9.92v17.973H68V68Zm23.627 30.213c6.475 0 10.321-3.788 10.45-8.806l.003-.42c0-5.92-4.107-9.094-10.667-9.094h-10.08v18.32h10.294Zm31.013-.053V98a30.427 30.427 0 0 1 31.227-30.987 30.907 30.907 0 0 1 23.626 9.227l-8.373 9.68a22.213 22.213 0 0 0-15.333-6.773c-9.995 0-17.225 8.214-17.384 18.325L136.4 98c0 10.267 7.12 18.827 17.387 18.827 6.23 0 10.256-2.204 14.483-5.87l.636-.561c.213-.191.426-.385.64-.583l8.374 8.454a30.56 30.56 0 0 1-24.56 10.666 30.267 30.267 0 0 1-30.72-30.773Z"
            fill="#fff"
          />
        </mask>
      </defs>
      <path mask={`url(#${id})`} fill="currentColor" d="M0 0h256v256H0z" />
    </svg>
  )
}

export default PyCharm