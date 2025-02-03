import createGlobe from 'cobe'
import { useEffect, useRef } from 'react'

// const doublePi = Math.PI * 2
// const speed = 0.001

export default function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // const focusRef = useRef<number | null>(null)
  // const pointerHovering = useRef<boolean>(false)

  useEffect(() => {
    if (!canvasRef.current) return

    let phi = -0.1
    let width = 0
    let devicePixelRatio = window.devicePixelRatio * 2
    const onResize = () =>
      canvasRef.current && (width = canvasRef.current.offsetWidth)
    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: devicePixelRatio,
      width: width * devicePixelRatio,
      height: width * devicePixelRatio,
      phi,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 15000,
      mapBrightness: 4,
      baseColor: [0.4, 0.4, 0.4],
      markerColor: [234, 88, 12].map((c) => c / 255) as [
        number,
        number,
        number
      ],
      // markerColor: [0.1, 0.8, 1],
      glowColor: [0.15, 0.15, 0.15],
      markers: [{ location: [43.6532, -79.3832], size: 0.05 }],
      onRender: (state) => {
        // Called on every animation frame.
        state.width = width * devicePixelRatio
        state.height = width * devicePixelRatio
        // state.phi = phi
        // if (focusRef.current !== null) {
        //   const focusPhi = focusRef.current
        //   const distPositive = (focusPhi - phi + doublePi) % doublePi
        //   const distNegative = (phi - focusPhi + doublePi) % doublePi

        //   // Control the speed
        //   let newDiff = 0
        //   if (distPositive < distNegative) {
        //     newDiff += distPositive * 0.02
        //   } else {
        //     newDiff -= distNegative * 0.02
        //   }
        //   phi += newDiff

        //   if (Math.abs(newDiff) < 0.001) {
        //     focusRef.current = null
        //   }
        // } else if (!pointerHovering.current) {
        //   phi += speed // * direction
        // }

        // if (phi > doublePi) {
        //   phi -= doublePi
        // }
      }
    })

    const onUnload = () => {
      globe.destroy()
    }

    window.onbeforeunload = onUnload
    return () => {
      onUnload()
      window.removeEventListener('resize', onResize)
      window.onbeforeunload = null
    }
  }, [canvasRef])

  return (
    <div className="relative aspect-[1] w-full max-w-[600px]">
      <canvas
        ref={canvasRef}
        className="h-full w-full animate-[scaleUp_1.2s_forwards] will-change-transform contain-[layout_paint_size]"
        // onPointerEnter={() => {
        //   pointerHovering.current = true
        //   focusRef.current = -0.1
        // }}
        // onPointerOut={() => {
        //   pointerHovering.current = false
        // }}
        // onPointerDown={(e) => {
        //   // focusRef.current = Math.PI - ((43.6532 * Math.PI) / 180 - Math.PI / 2)
        // }}
      />
    </div>
  )
}
