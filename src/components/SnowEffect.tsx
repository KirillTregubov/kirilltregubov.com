import Snowfall from 'react-snowfall'

const snowflake = document.createElement('img')
snowflake.src = '/assets/snowflake.png'

export default function SnowEffect() {
  return (
    <Snowfall
      changeFrequency={400}
      opacity={[0.3, 0.8]}
      radius={[6.0, 10.0]}
      speed={[0.5, 0.75]}
      wind={[-0.5, 1.5]}
      rotationSpeed={[-0.5, 0.5]}
      images={[snowflake]}
      style={{
        zIndex: 999,
        position: 'fixed',
        width: '100vw',
        height: '100vh',
      }}
      snowflakeCount={50}
    />
  )
}
