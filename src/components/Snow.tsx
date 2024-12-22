import Snowfall from 'react-snowfall'

const snowflake1 = document.createElement('img')
snowflake1.src = '/assets/snowflake.png'

export default function Snow() {
  return (
    <Snowfall
      changeFrequency={400}
      opacity={[0.3, 0.5]}
      radius={[0.5, 10.0]}
      rotationSpeed={[-0.5, 0.5]}
      images={[snowflake1]}
      style={{ zIndex: 999 }}
    />
  )
}
