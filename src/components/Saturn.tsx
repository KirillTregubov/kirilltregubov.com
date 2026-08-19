import { lazy, Suspense, useEffect, useState } from 'react'

const SaturnScene = lazy(() => import('./SaturnScene'))

function Fallback({ className }: { className?: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <img
        src="/assets/SaturnPlaceholder.jpg"
        alt="Saturn placeholder"
        className={`object-cover motion-safe:animate-[scaleUp_1s_forwards_0.1s] motion-safe:opacity-0${className ? ` ${className}` : ''}`}
        loading="eager"
      />
    </div>
  )
}

export default function Saturn({ fallbackClass }: { fallbackClass?: string }) {
  const [renderScene, setRenderScene] = useState(false)

  useEffect(() => {
    let active = true

    void import('detect-gpu')
      .then(async ({ getGPUTier }) => {
        const { tier } = await getGPUTier()
        if (active && tier >= 2) setRenderScene(true)
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [])

  if (!renderScene) return <Fallback className={fallbackClass} />

  return (
    <Suspense fallback={<Fallback className={fallbackClass} />}>
      <SaturnScene />
    </Suspense>
  )
}
