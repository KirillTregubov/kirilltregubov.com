import { lazy, Suspense } from 'react'

// Loaded only in season, so react-snowfall and the snowflake image are not
// downloaded the rest of the year. The date check runs in the browser, so the
// effect turns on and off without a rebuild.
const SnowEffect = lazy(() => import('./SnowEffect'))

function isHolidaySeason(today = new Date()) {
  return (
    today.getMonth() === 11 || (today.getMonth() === 0 && today.getDate() <= 5)
  )
}

export default function Snow() {
  if (!isHolidaySeason()) {
    return null
  }
  return (
    <Suspense>
      <SnowEffect />
    </Suspense>
  )
}
