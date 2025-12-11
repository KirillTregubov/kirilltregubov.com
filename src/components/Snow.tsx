import { useMemo } from 'react'
import Snowfall from 'react-snowfall'
import useIsMobile from './hooks/useIsMobile'

const snowflake = document.createElement('img')
snowflake.src = '/assets/snowflake.png'

export default function Snow() {
  const isHolidaySeason = useMemo(() => {
    const today = new Date()
    return (
      today.getMonth() === 11 ||
      (today.getMonth() === 0 && today.getDate() <= 5)
    )
  }, [])

  const { isMobile } = useIsMobile()

  if (!isHolidaySeason) {
    return null
  }
  return (
    <Snowfall
      changeFrequency={400}
      opacity={[0.3, 0.8]}
      radius={[0.5, 10.0]}
      speed={[0.5, 1.0]}
      rotationSpeed={[-0.5, 0.5]}
      images={[snowflake]}
      style={{ zIndex: 999 }}
      snowflakeCount={isMobile ? 150 : 200}
    />
  )
}
