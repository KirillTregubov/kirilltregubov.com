import type * as THREE from 'three'
import { animated, useReducedMotion, useSpring } from '@react-spring/three'
import {
  // OrbitControls,
  PerspectiveCamera,
  Preload,
  useGLTF
} from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useRef, useState } from 'react'

function Scene({ onReady }: { onReady: () => void }) {
  // source: https://science.nasa.gov/resource/saturn-3d-model/
  const { scene } = useGLTF('/assets/Saturn.glb')
  const sceneRef = useRef<THREE.Object3D>(null)
  const [shown, setShown] = useState(false)
  const reducedMotion = useReducedMotion()
  const { scale } = useSpring({
    scale: reducedMotion || shown ? [0.1, 0.1, 0.1] : [0.06, 0.06, 0.06],
    config: { mass: 2, tension: 280, friction: 60 }
  })
  // const camera = useThree((state) => state.camera)

  useFrame(() => {
    if (sceneRef.current) {
      // Incrementally rotates the object around the y-axis
      sceneRef.current.rotation.y += 0.001
      //   sceneRef.current.rotation.z -= 0.01

      if (sceneRef.current.rotation.y > Math.PI * 2) {
        sceneRef.current.rotation.y = 0
      }
    }
  })

  useEffect(() => {
    setShown(true)
    return () => setShown(false)
  }, [])

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
      {/* <OrbitControls
        // ref={cameraRef}
        // args={[camera, gl.domElement]}
        // camera={camera}
        target={[0, 0, 0]}
        enablePan={false}
        enableZoom={false}
        // enableRotate={false}
        maxPolarAngle={2 * Math.PI} // Prevents camera from going below the object
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
    const handler = () => {
      if (!ref || !ref.current) return
      ref.current.style.opacity = '0'
    }

    window.addEventListener('beforeunload', handler)
    return () => {
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
