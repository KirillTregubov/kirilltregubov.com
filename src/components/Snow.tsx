import Snowfall from 'react-snowfall'

const snowflake = document.createElement('img')
snowflake.src = '/assets/snowflake.png'

export default function Snow() {
  return (
    <Snowfall
      changeFrequency={400}
      opacity={[0.3, 0.8]}
      radius={[0.5, 10.0]}
      speed={[0.5, 1.0]}
      rotationSpeed={[-0.5, 0.5]}
      images={[snowflake]}
      style={{ zIndex: 999 }}
    />
  )
}
