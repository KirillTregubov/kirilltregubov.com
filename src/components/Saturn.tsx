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
        draggable="false"
      />
    </div>
  )
}

interface SaturnProps {
  className?: string
  fallbackClass?: string
  sceneScale?: number
  staticOnly?: boolean
}

export default function Saturn({
  className,
  fallbackClass,
  sceneScale,
  staticOnly = false,
}: SaturnProps) {
  const [renderScene, setRenderScene] = useState(false)
  const [sceneReady, setSceneReady] = useState(false)
  const handleSceneReady = useCallback(() => setSceneReady(true), [])

  useEffect(() => {
    if (staticOnly) return

    let active = true

    void import('@pmndrs/detect-gpu')
      .then(async ({ getGPUTier }) => {
        const result = await getGPUTier()
        if (!active) return

        const detectionWasInconclusive =
          result.type === 'FALLBACK' || result.type === 'BENCHMARK_FETCH_FAILED'

        if (result.tier >= 2 || detectionWasInconclusive) {
          setRenderScene(true)
        } else {
          console.info(
            `[Saturn] Skipping 3D scene (GPU: ${result.gpu ?? 'unknown'}, tier: ${result.tier}, detection: ${result.type})`,
          )
        }
      })
      .catch(() => {})

    return () => {
      active = false
    }
  }, [staticOnly])

  if (staticOnly) {
    return (
      <div className={`relative h-full w-full ${className ?? ''}`}>
        <Fallback className={fallbackClass} />
      </div>
    )
  }

  return (
    <div className={`relative h-full w-full ${className ?? ''}`}>
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
            <SaturnScene onReady={handleSceneReady} scale={sceneScale} />
          </Suspense>
        </div>
      )}
    </div>
  )
}
