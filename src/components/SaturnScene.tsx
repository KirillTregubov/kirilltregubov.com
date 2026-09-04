import { animated, useReducedMotion, useSpring } from '@react-spring/three'
import { PerspectiveCamera, Preload, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import type * as THREE from 'three'

const DRAG_RADIANS_PER_PIXEL = 0.01
const MAX_DRAG_SPEED = 6
const MAX_MOMENTUM_SPEED = 2.5

function Scene({ onReady }: { onReady: () => void }) {
  // source: https://science.nasa.gov/resource/saturn-3d-model/
  const { scene } = useGLTF('/assets/Saturn.glb')
  const sceneRef = useRef<THREE.Object3D>(null)
  const spinVelocityRef = useRef(0)
  const draggingRef = useRef(false)
  const canvas = useThree((state) => state.gl.domElement)
  const [shown, setShown] = useState(false)
  const reducedMotion = useReducedMotion()
  const { scale } = useSpring({
    scale: reducedMotion || shown ? [0.1, 0.1, 0.1] : [0.06, 0.06, 0.06],
    config: { mass: 2, tension: 280, friction: 60 },
  })
  // const camera = useThree((state) => state.camera)

  useFrame((_, delta) => {
    if (sceneRef.current) {
      const momentum = draggingRef.current ? 0 : spinVelocityRef.current
      sceneRef.current.rotation.y += (0.06 + momentum) * delta

      spinVelocityRef.current *= Math.exp(-3.5 * delta)
      if (Math.abs(spinVelocityRef.current) < 0.001) {
        spinVelocityRef.current = 0
      }

      if (Math.abs(sceneRef.current.rotation.y) > Math.PI * 2) {
        sceneRef.current.rotation.y %= Math.PI * 2
      }
    }
  })

  useEffect(() => {
    setShown(true)
    return () => setShown(false)
  }, [])

  useEffect(() => {
    let activePointerId: number | null = null
    let lastPointerX = 0
    let lastPointerTime = 0

    const finishDrag = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId) return

      if (canvas.hasPointerCapture(event.pointerId)) {
        canvas.releasePointerCapture(event.pointerId)
      }
      activePointerId = null
      draggingRef.current = false
      canvas.style.cursor = 'grab'
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!event.isPrimary || event.button !== 0) return

      activePointerId = event.pointerId
      lastPointerX = event.clientX
      lastPointerTime = event.timeStamp
      spinVelocityRef.current = 0
      draggingRef.current = true
      canvas.setPointerCapture(event.pointerId)
      canvas.style.cursor = 'grabbing'
      event.preventDefault()
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== activePointerId || !sceneRef.current) return

      const deltaX = event.clientX - lastPointerX
      const elapsedSeconds =
        Math.max(event.timeStamp - lastPointerTime, 8) / 1000
      const requestedRotation = deltaX * DRAG_RADIANS_PER_PIXEL
      const maxRotation = MAX_DRAG_SPEED * elapsedSeconds
      const deltaRotation = Math.max(
        -maxRotation,
        Math.min(maxRotation, requestedRotation),
      )
      const velocity = deltaRotation / elapsedSeconds

      sceneRef.current.rotation.y += deltaRotation
      spinVelocityRef.current = reducedMotion
        ? 0
        : Math.max(
            -MAX_MOMENTUM_SPEED,
            Math.min(
              MAX_MOMENTUM_SPEED,
              spinVelocityRef.current * 0.65 + velocity * 0.35,
            ),
          )
      lastPointerX = event.clientX
      lastPointerTime = event.timeStamp
      event.preventDefault()
    }

    canvas.style.cursor = 'grab'
    canvas.addEventListener('pointerdown', handlePointerDown)
    canvas.addEventListener('pointermove', handlePointerMove)
    canvas.addEventListener('pointerup', finishDrag)
    canvas.addEventListener('pointercancel', finishDrag)

    return () => {
      canvas.style.cursor = ''
      canvas.removeEventListener('pointerdown', handlePointerDown)
      canvas.removeEventListener('pointermove', handlePointerMove)
      canvas.removeEventListener('pointerup', finishDrag)
      canvas.removeEventListener('pointercancel', finishDrag)
    }
  }, [canvas, reducedMotion])

  useEffect(() => {
    let secondFrame = 0
    const firstFrame = requestAnimationFrame(() => {
      secondFrame = requestAnimationFrame(onReady)
    })

    return () => {
      cancelAnimationFrame(firstFrame)
      cancelAnimationFrame(secondFrame)
    }
  }, [onReady])

  // useEffect(() => {
  //   const ringsTop = scene.getObjectByName('RingsTop')
  //   const ringsBottom = scene.getObjectByName('RingsBottom')

  //   if (ringsTop && ringsBottom) {
  //     // const color = 0xffffff
  //     // ringsTop.material.color = new THREE.Color(color)
  //     // ringsTop.material.emissive = new THREE.Color(color)
  //     // ringsTop.material.emissive = new THREE.Color(0xffffff)
  //     // ringsTop.material.emissiveIntensity = 1
  //     // console.log(ringsTop, ringsTop.material)
  //   }
  // }, [scene])

  return (
    // @ts-expect-error Type instantiation is excessively deep and possibly infinite.
    <animated.primitive
      ref={sceneRef}
      object={scene}
      scale={scale}
      position={[0, 0, 0]}
    />
  )
}

function CanvasContent({ onReady }: { onReady: () => void }) {
  useThree((state) => {
    state.camera?.lookAt(0, 0, 0)
    // state.camera?.rotateY(-0.1)
    // state.camera?.rotateX(-0.05)
    state.camera?.rotateZ(-0.3)
  })
  const lightRef = useRef<THREE.PointLight>(null)

  return (
    <>
      <Scene onReady={onReady} />
      <Preload all />
      <PerspectiveCamera
        makeDefault
        // position={[200, 60, 175]}
        position={[150, 40, 150]}
      />
      {/* [170, 170, 170] */}
      <pointLight
        ref={lightRef}
        position={[150, 85, 25]}
        // position={lightProps.position}
        intensity={12000}
      />
      {/* <directionalLight intensity={1.5} position={[1, 0.6, 0]} /> */}
      <color attach="background" args={['#171717']} />
    </>
  )
}

function OuterCanvas({ onReady }: { onReady: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (canvas) canvas.style.touchAction = 'none'

    const handler = () => {
      if (!ref.current) return
      ref.current.style.opacity = '0'
    }

    window.addEventListener('beforeunload', handler)
    return () => {
      if (canvas) canvas.style.touchAction = ''
      window.removeEventListener('beforeunload', handler)
    }
  }, [])

  return (
    <Canvas ref={ref}>
      <Suspense fallback={null}>
        <CanvasContent onReady={onReady} />
      </Suspense>
    </Canvas>
  )
}

export default function SaturnScene({ onReady }: { onReady: () => void }) {
  return <OuterCanvas onReady={onReady} />
}
