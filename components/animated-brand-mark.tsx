"use client"

import { useEffect, useRef } from "react"
import { BRAND_VIEWBOX, createBrandGeometry } from "@/lib/brand-geometry"

const pieces = createBrandGeometry()
const duration = 2400
const offsets = [[-20, -12], [20, -10], [0, 20]] as const
const progress = (time: number, delay: number, length: number) =>
  Math.min(1, Math.max(0, (time - delay) / length))

export default function AnimatedBrandMark() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!svg || preference.matches || !("IntersectionObserver" in window)) return

    const paths = Array.from(svg.querySelectorAll("path"))
    let elapsed = 0
    let previous: number | null = null
    let frame: number | null = null
    let visible = false
    let finished = false

    const draw = (time: number) => {
      const trace = progress(time, 0, 600)
      const fill = progress(time, 1800, 600)
      paths.forEach((path, index) => {
        // u = clamp((t-delay)/duration); e = 1-(1-u)^3.
        // P(t) = Pfinal + (1-e)*offset, within the reserved SVG margins.
        const u = progress(time, 600 + index * 100, 1200 - index * 100)
        const remaining = Math.pow(1 - u, 3)
        const [x, y] = offsets[index]
        path.setAttribute("transform", `translate(${x * remaining} ${y * remaining})`)
        path.setAttribute("fill-opacity", String(fill))
        path.setAttribute("stroke", pieces[index].fill)
        path.setAttribute("stroke-width", "2")
        path.setAttribute("stroke-dasharray", "1")
        path.setAttribute("stroke-dashoffset", String(1 - trace))
        path.setAttribute("stroke-opacity", String(1 - fill))
      })
    }

    const pause = () => {
      if (frame !== null) cancelAnimationFrame(frame)
      frame = null
      previous = null
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      synchronize()
    })

    const cleanup = () => {
      pause()
      observer.disconnect()
      document.removeEventListener("visibilitychange", synchronize)
      preference.removeEventListener("change", onPreferenceChange)
    }

    const finish = () => {
      finished = true
      // Restore the exact server-rendered geometry, with no residual guides.
      paths.forEach((path) => {
        for (const attribute of ["transform", "fill-opacity", "stroke", "stroke-width",
          "stroke-dasharray", "stroke-dashoffset", "stroke-opacity"]) {
          path.removeAttribute(attribute)
        }
      })
      cleanup()
    }

    const tick = (now: number) => {
      frame = null
      if (finished) return
      elapsed += previous === null ? 0 : now - previous
      previous = now
      if (elapsed >= duration) {
        finish()
        return
      }
      draw(elapsed)
      frame = requestAnimationFrame(tick)
    }

    function synchronize() {
      if (finished) return
      if (!visible || document.hidden) {
        pause()
      } else if (frame === null) {
        previous = performance.now()
        frame = requestAnimationFrame(tick)
      }
    }

    function onPreferenceChange() {
      if (preference.matches) finish()
    }

    draw(0)
    observer.observe(svg)
    document.addEventListener("visibilitychange", synchronize)
    preference.addEventListener("change", onPreferenceChange)
    return () => {
      finished = true
      cleanup()
    }
  }, [])

  return (
    <div
      className="pointer-events-none mx-auto flex h-[106px] w-[112px] items-center justify-center md:h-[136px] md:w-[144px]"
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${BRAND_VIEWBOX.width} ${BRAND_VIEWBOX.height}`}
        className="h-auto w-[96px] overflow-visible md:w-[120px]"
        focusable="false"
      >
        {pieces.map(({ id, d, fill }) => (
          <path key={id} d={d} fill={fill} pathLength={1} />
        ))}
      </svg>
    </div>
  )
}
