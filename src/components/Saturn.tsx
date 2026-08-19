import { lazy, Suspense, useCallback, useEffect, useState } from 'react'

const SaturnScene = lazy(() => import('./SaturnScene'))

function Fallback({ className }: { className?: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <img
        src="/assets/SaturnPlaceholder.jpg"
        alt="Saturn placeholder"
        className={`object-cover motion-safe:animate-[saturnPlaceholderIn_800ms_ease-out_forwards] motion-safe:opacity-0${className ? ` ${className}` : ''}`}
        loading="eager"
      />
    </div>
  )
}

export default function Saturn({ fallbackClass }: { fallbackClass?: string }) {
  const [renderScene, setRenderScene] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const handleSceneReady = useCallback(() => setSceneReady(true), [])

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

  return (
    <div className="relative h-full w-full">
      <div
        className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${sceneReady ? 'pointer-events-none opacity-0' : 'opacity-100'}`}
        aria-hidden={sceneReady}
      >
        <Fallback className={fallbackClass} />
      </div>
      {renderScene && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 motion-reduce:transition-none ${sceneReady ? 'opacity-100' : 'opacity-0'}`}
        >
          <Suspense fallback={null}>
            <SaturnScene onReady={handleSceneReady} />
          </Suspense>
        </div>
      )}
    </div>
  )
}
