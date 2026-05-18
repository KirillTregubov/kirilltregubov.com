import { animated, useReducedMotion, useSpring } from "@react-spring/three"
import { PerspectiveCamera, Preload, useDetectGPU, useGLTF, useProgress } from "@react-three/drei"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { ClientOnly } from "@tanstack/react-router"
import { Suspense, useEffect, useRef, useState } from "react"
import type * as THREE from "three"

import { SATURN_MODEL_URL } from "#/lib/saturn"

function Scene() {
  // source: https://science.nasa.gov/resource/saturn-3d-model/
  const { scene } = useGLTF(SATURN_MODEL_URL)
  const sceneRef = useRef<THREE.Object3D>(null)
  const [shown, setShown] = useState(false)
  const reducedMotion = useReducedMotion()
  const { scale } = useSpring({
    scale: reducedMotion || shown ? [0.1, 0.1, 0.1] : [0.06, 0.06, 0.06],
    config: { mass: 2, tension: 280, friction: 60 },
  })

  useFrame(() => {
    if (!sceneRef.current) {
      return
    }

    sceneRef.current.rotation.y += 0.001

    if (sceneRef.current.rotation.y > Math.PI * 2) {
      sceneRef.current.rotation.y = 0
    }
  })

  useEffect(() => {
    setShown(true)
    return () => setShown(false)
  }, [])

  return (
    // @ts-expect-error Type instantiation is excessively deep and possibly infinite.
    <animated.primitive ref={sceneRef} object={scene} scale={scale} position={[0, 0, 0]} />
  )
}

function CanvasContent() {
  useThree((state) => {
    state.camera?.lookAt(0, 0, 0)
    state.camera?.rotateZ(-0.3)
  })
  const lightRef = useRef<THREE.PointLight>(null)

  return (
    <>
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
      <Preload all />
      <PerspectiveCamera makeDefault position={[150, 40, 150]} />
      <pointLight ref={lightRef} position={[150, 85, 25]} intensity={12000} />
    </>
  )
}

function OuterCanvas() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { progress } = useProgress()

  // useEffect(() => {
  //   const handler = () => {
  //     if (!wrapperRef.current) {
  //       return
  //     }

  //     wrapperRef.current.style.opacity = "0"
  //   }

  //   window.addEventListener("beforeunload", handler)
  //   return () => {
  //     window.removeEventListener("beforeunload", handler)
  //   }
  // }, [])

  return (
    <div
      ref={wrapperRef}
      className={`h-full w-full opacity-0 ${
        progress === 100 ? "animate-[fadeIn_1s_forwards]" : ""
      }`}
    >
      <Canvas style={{ width: "100%", height: "100%" }}>
        <CanvasContent />
      </Canvas>
    </div>
  )
}

function Fallback({ className }: { className?: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <img
        src="/assets/SaturnPlaceholder.jpg"
        alt="Saturn placeholder"
        className={`bg-neutral-900 object-cover motion-safe:animate-[scaleUp_1s_forwards_0.1s] motion-safe:opacity-0 ${className}`}
        loading="eager"
      />
    </div>
  )
}

function useShouldSkip() {
  if (import.meta.env.SSR) {
    return true
  }

  const gpuTier = useDetectGPU()
  return gpuTier.tier < 2
}

export default function Saturn({ fallbackClass }: { fallbackClass?: string }) {
  const shouldSkip = useShouldSkip()

  return (
    <ClientOnly fallback={<SaturnLoading />}>
      {/* <Suspense fallback={<SaturnLoading />}> */}
      {shouldSkip ? <Fallback className={fallbackClass} /> : <OuterCanvas />}
      {/* </Suspense> */}
    </ClientOnly>
  )
}

// if (typeof window !== "undefined") {
//   useGLTF.preload(SATURN_MODEL_URL)
// }

function SaturnLoading() {
  return <div className="absolute inset-0 flex items-center justify-center" />
}
