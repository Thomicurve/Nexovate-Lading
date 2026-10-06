"use client"

import { useEffect, useRef, useState } from "react"
import { FileInput, CircleCheck, ListChecks, Database, Pause, Play } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

const stageDuration = 2000
const cycleDuration = stageDuration * 4

export default function ProcessMotion() {
  const t = useTranslations("motion")
  const graphicRef = useRef<HTMLDivElement>(null)
  const elapsedRef = useRef(0)
  const [paused, setPaused] = useState(false)
  const [reduced, setReduced] = useState(true)
  const stages = [
    { label: t("input"), icon: FileInput },
    { label: t("validation"), icon: CircleCheck },
    { label: t("tracking"), icon: ListChecks },
    { label: t("data"), icon: Database },
  ]

  useEffect(() => {
    const graphic = graphicRef.current
    if (!graphic) return
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const steps = Array.from(graphic.querySelectorAll<HTMLElement>("[data-process-stage]"))
    let inViewport = false
    let frame = 0
    let previousTime: number | null = null

    const paint = () => {
      const elapsed = elapsedRef.current % cycleDuration
      const active = Math.floor(elapsed / stageDuration)
      graphic.dataset.mode = media.matches ? "static" : "animated"
      graphic.style.setProperty("--process-progress", `${(elapsed % stageDuration) / stageDuration * 100}%`)
      steps.forEach((step, index) => {
        step.dataset.active = String(media.matches || index === active)
        step.dataset.moving = String(!media.matches && index === active && index < 3)
      })
    }

    const canRun = () => !paused && !media.matches && inViewport && !document.hidden
    const tick = (time: number) => {
      if (!canRun()) {
        frame = 0
        previousTime = null
        return
      }
      if (previousTime !== null) elapsedRef.current += time - previousTime
      previousTime = time
      paint()
      frame = requestAnimationFrame(tick)
    }
    const synchronize = () => {
      paint()
      if (canRun()) {
        if (!frame) frame = requestAnimationFrame(tick)
      } else {
        cancelAnimationFrame(frame)
        frame = 0
        previousTime = null
      }
    }
    const onPreferenceChange = () => {
      setReduced(media.matches)
      synchronize()
    }
    const observer = new IntersectionObserver(([entry]) => {
      inViewport = entry.isIntersecting
      synchronize()
    })

    observer.observe(graphic)
    media.addEventListener("change", onPreferenceChange)
    document.addEventListener("visibilitychange", synchronize)
    onPreferenceChange()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      media.removeEventListener("change", onPreferenceChange)
      document.removeEventListener("visibilitychange", synchronize)
    }
  }, [paused])

  return (
    <div ref={graphicRef} className="process-motion relative z-30 w-full max-w-[1080px]" data-mode={reduced ? "static" : "animated"}>
      <figure aria-label={t("description")}>
        <ol className="process-track" aria-hidden="true">
          {stages.map((stage, index) => (
            <li key={stage.label} className="process-step" data-process-stage>
              <div className="process-node">
                <stage.icon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                <span>{stage.label}</span>
              </div>
              {index < stages.length - 1 && (
                <span className="process-connector">
                  <span className="process-signal" />
                </span>
              )}
            </li>
          ))}
        </ol>
      </figure>
      {!reduced && (
        <Button type="button" variant="outline" className="mt-4 h-11 min-w-[174px]" aria-pressed={paused} onClick={() => setPaused(!paused)}>
          {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          {paused ? t("resume") : t("pause")}
        </Button>
      )}
    </div>
  )
}
