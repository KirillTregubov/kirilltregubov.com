const React: React.FC = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-11.5 -10.232 23 20.463"
    width="1em"
    height="1em"
    fill="currentColor"
    stroke="currentColor"
    role="img"
    {...props}
  >
    <circle r={2.05} stroke="none" />
    <g fill="none">
      <ellipse rx={11} ry={4.2} />
      <ellipse rx={11} ry={4.2} transform="rotate(60)" />
      <ellipse rx={11} ry={4.2} transform="rotate(120)" />
    </g>
  </svg>
)

export default React
