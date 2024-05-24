import {
  // OrbitControls,
  PerspectiveCamera,
  Preload,
  useDetectGPU,
  useGLTF
} from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'

function Scene() {
  // source: https://science.nasa.gov/resource/saturn-3d-model/
  const { scene } = useGLTF('/assets/Saturn.glb')
  const sceneRef = useRef<THREE.Object3D>(null)
  const [shown, setShown] = useState(false)
  const { scale } = useSpring({
    scale: shown ? [0.1, 0.1, 0.1] : [0, 0, 0],
    config: { mass: 2, tension: 280, friction: 60 }
  })

  useFrame(() => {
    if (sceneRef.current) {
      //   console.log(sceneRef.current.rotation)

      // Incrementally rotates the object around the y-axis
      sceneRef.current.rotation.y += 0.0005

      //   sceneRef.current.rotation.z -= 0.01

      if (sceneRef.current.rotation.y > Math.PI * 2) {
        sceneRef.current.rotation.y = 0
      }
    }
  })

  useEffect(() => {
    setShown(true)

    return () => {
      setShown(false)
    }
  }, [])

  useEffect(() => {
    const ringsTop = scene.getObjectByName('RingsTop')
    const ringsBottom = scene.getObjectByName('RingsBottom')

    if (ringsTop && ringsBottom) {
      // const color = 0xffffff
      // ringsTop.material.color = new THREE.Color(color)
      // ringsTop.material.emissive = new THREE.Color(color)
      // ringsTop.material.emissive = new THREE.Color(0xffffff)
      // ringsTop.material.emissiveIntensity = 1
      // console.log(ringsTop, ringsTop.material)
    }
  }, [scene])

  return (
    <>
      {/* @ts-expect-error Type instantiation is excessively deep and possibly infinite */}
      <animated.primitive
        ref={sceneRef}
        object={scene}
        scale={scale}
        position={[0, 0, 0]}
      />
    </>
  )
}

function CanvasContent() {
  useThree((state) => {
    state.camera?.lookAt(0, 0, 0)
    // state.camera?.rotateY(-0.1)
    // state.camera?.rotateX(-0.05)
    state.camera?.rotateZ(-0.3)
  })
  const lightRef = useRef<any>(null)

  return (
    <>
      <Scene />
      {/* <OrbitControls
        // ref={cameraRef}
        // args={[camera, gl.domElement]}
        target={[0, 0, 0]}
        enablePan={false}
        enableZoom={false}
        // onChange={(e) => {
        //   if (!e) return
        //   const camera = e.target.object
        //   console.log(camera.position)

        //   if (lightRef.current) {
        //     const up = new THREE.Vector3(0, 0, 1)
        //     const distanceUp = -170
        //     up.multiplyScalar(distanceUp)

        //     lightRef.current.position.copy(camera.position).add(up)
        //   }
        // }}
      /> */}
      <Preload all />
      <PerspectiveCamera
        makeDefault
        // position={[150, 40, 150]}
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

function OuterCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  // const [opacity, setOpacity] = useState(0)

  useEffect(() => {
    const handler = () => {
      if (!ref.current) return
      ref.current.style.opacity = '0'
    }

    window.addEventListener('beforeunload', handler)
    return () => {
      window.removeEventListener('beforeunload', handler)
    }
  }, [])

  return (
    <Canvas
      ref={ref}
      className="animate-[fadeIn_1s_forwards]"
      // style={{ opacity: opacity }}
    >
      <Suspense fallback={null}>
        <CanvasContent />
      </Suspense>
    </Canvas>
  )
}

function Fallback() {
  return (
    <img
      src="/assets/SaturnPlaceholder.jpg"
      alt="Saturn placeholder"
      className="h-full w-full animate-[scaleUp_1s_forwards_0.1s] object-contain opacity-0"
    />
  )
}

function useDetection() {
  if (import.meta.env.SSR) {
    return true
  }
  const GPUTier = useDetectGPU()
  return GPUTier.tier < 2 // || GPUTier.isMobile
} // TODO: change to 2

export default function Saturn() {
  const detected = useDetection()

  return (
    <Suspense fallback={null}>
      {detected ? <Fallback /> : <OuterCanvas />}
    </Suspense>
  )
}