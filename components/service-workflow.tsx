"use client"

import { useEffect, useId, useRef, useState } from "react"
import { useAnimate } from "framer-motion"
import { useTranslations } from "next-intl"
import { TrayIcon } from "@phosphor-icons/react/dist/csr/Tray"
import { TableIcon } from "@phosphor-icons/react/dist/csr/Table"
import { StackIcon } from "@phosphor-icons/react/dist/csr/Stack"
import { ClockIcon } from "@phosphor-icons/react/dist/csr/Clock"
import { DatabaseIcon } from "@phosphor-icons/react/dist/csr/Database"
import { FlowArrowIcon } from "@phosphor-icons/react/dist/csr/FlowArrow"
import { CheckCircleIcon } from "@phosphor-icons/react/dist/csr/CheckCircle"
import { PauseIcon } from "@phosphor-icons/react/dist/csr/Pause"
import { PlayIcon } from "@phosphor-icons/react/dist/csr/Play"
import { Button } from "@/components/ui/button"

const examples = ["customSoftware", "automation", "traceability", "dataIntegration"] as const
type Example = typeof examples[number]
type Lane = "manual" | "optimized"
const nodes = [0, 1, 2, 3] as const
const requests = [0, 1, 2] as const
const laneIcons = {
  manual: [TrayIcon, TableIcon, StackIcon, ClockIcon],
  optimized: [TrayIcon, DatabaseIcon, FlowArrowIcon, CheckCircleIcon],
}

function WorkflowLane({ example, lane, running, reduced, mounted }: {
  example: Example
  lane: Lane
  running: boolean
  reduced: boolean
  mounted: boolean
}) {
  const t = useTranslations("solutions.workflow")
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const [width, setWidth] = useState(0)
  const [laneVisible, setLaneVisible] = useState(false)
  const controls = useRef<Array<ReturnType<typeof animate>>>([])
  const manual = lane === "manual"
  const moving = running && laneVisible

  useEffect(() => {
    const element = scope.current
    if (!element || !("IntersectionObserver" in window)) return
    const observer = new IntersectionObserver(([entry]) => setLaneVisible(entry.isIntersecting))
    observer.observe(element)
    return () => observer.disconnect()
  }, [scope])

  useEffect(() => {
    const element = scope.current
    if (!element) return
    const measure = () => setWidth(element.clientWidth)
    measure()
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure)
      return () => window.removeEventListener("resize", measure)
    }
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [scope])

  useEffect(() => {
    const element = scope.current
    if (!element || !width || reduced || !mounted) return
    const tokens = Array.from(element.querySelectorAll<HTMLElement>("[data-request]"))
    const reset = () => tokens.forEach((token, index) => {
      token.style.left = manual ? "62.5%" : "87.5%"
      token.style.top = `${52 + (index - 1) * 10}px`
      token.style.removeProperty("transform")
      token.style.removeProperty("opacity")
    })
    controls.current = requests.map(index => {
      tokens[index].style.left = "0px"
      tokens[index].style.top = "52px"
      const end = manual ? width * 0.625 - 6 : width * 0.875 - 6
      const control = animate(`[data-request="${index}"]`, {
        x: [width * 0.125 - 6, width * 0.375 - 6, end, end],
        y: [0, 0, manual ? (index - 1) * 10 : 0, manual ? (index - 1) * 10 : 0],
        opacity: manual ? [1, 1, 1, 1] : [1, 1, 1, 0],
      }, {
        duration: 4,
        times: [0, 0.25, 0.7, 1],
        delay: index * 0.4,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 1.2,
      })
      control.pause()
      return control
    })
    return () => {
      controls.current.forEach(control => control.stop())
      controls.current = []
      reset()
    }
  }, [animate, scope, width, reduced, mounted, manual])

  useEffect(() => {
    controls.current.forEach(control => moving ? control.play() : control.pause())
  }, [moving, width, reduced, mounted])

  return (
    <article data-workflow-lane={lane} className="min-w-0 rounded-xl border bg-background p-4 md:p-6">
      <h4 className="text-lg font-semibold">{t(lane)}</h4>
      <div ref={scope} data-workflow-motion={mounted && !reduced ? moving && width ? "running" : "paused" : "static"}
        className="relative mt-6">
        <ol className="grid grid-cols-4 gap-2" aria-label={t(lane)}>
          {nodes.map(index => {
            const Icon = laneIcons[lane][index]
            return (
              <li key={index} className="relative min-w-0 text-center">
                {index < 3 && <span aria-hidden="true" className="absolute left-1/2 top-[56px] h-px w-[calc(100%+0.5rem)] bg-border" />}
                <span aria-hidden="true" className={`relative mx-auto flex h-10 w-10 items-center justify-center rounded-lg border bg-card ${manual ? "text-foreground" : "text-brand"}`}>
                  <Icon size={20} />
                </span>
                <p className="mt-9 break-words text-xs leading-5 text-foreground">{t(`${example}.${lane}.node${index}`)}</p>
              </li>
            )
          })}
        </ol>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {requests.map(index => <span key={index} data-request={index}
            className={`workflow-request absolute h-2 w-3 rounded-sm border ${manual ? "border-foreground bg-muted-foreground" : "border-brand bg-brand"}`}
            style={{ left: manual ? "62.5%" : "87.5%", top: 52 + (index - 1) * 10 }} />)}
        </div>
      </div>
      <p className="mt-5 flex items-start gap-2 border-t pt-4 text-sm leading-6 text-foreground">
        {manual ? <StackIcon size={20} aria-hidden="true" className="mt-1 shrink-0" /> : <CheckCircleIcon size={20} aria-hidden="true" className="mt-1 shrink-0" />}
        {t(`${example}.${lane}.summary`)}
      </p>
      <h5 className="mt-6 text-sm font-semibold">{t(manual ? "difficulties" : "benefits")}</h5>
      <ul className="mt-3 list-disc space-y-2 pl-4 text-sm leading-6 text-muted-foreground">
        {[0, 1].map(index => <li key={index}>{t(`${example}.${lane}.point${index}`)}</li>)}
      </ul>
    </article>
  )
}

export default function ServiceWorkflow() {
  const t = useTranslations("solutions.workflow")
  const services = useTranslations("solutions.features")
  const id = useId()
  const panel = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<Example>("customSoftware")
  const [mounted, setMounted] = useState(false)
  const [canAnimate, setCanAnimate] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [reduced, setReduced] = useState(true)
  const [paused, setPaused] = useState(false)
  const running = mounted && canAnimate && visible && pageVisible && !reduced && !paused

  useEffect(() => {
    setMounted(true)
    setCanAnimate("IntersectionObserver" in window)
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onPreference = () => setReduced(preference.matches)
    const onVisibility = () => setPageVisible(!document.hidden)
    onPreference()
    onVisibility()
    preference.addEventListener("change", onPreference)
    document.addEventListener("visibilitychange", onVisibility)
    const element = panel.current
    const observer = element && "IntersectionObserver" in window
      ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 })
      : null
    if (observer && element) observer.observe(element)
    return () => {
      observer?.disconnect()
      preference.removeEventListener("change", onPreference)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  function select(example: Example) {
    setSelected(example)
    setPaused(false)
  }

  return (
    <div className="mb-8 min-w-0 rounded-xl border bg-card p-4 md:p-6" data-workflow-example={selected}>
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground">{t("illustrative")}</p>
        <h3 className="text-2xl font-semibold tracking-tight">{t("title")}</h3>
        <p className="landing-copy">{t("description")}</p>
      </div>
      {mounted ? (
        <div role="group" aria-label={t("selector")} className="mt-6 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {examples.map(example => <button key={example} type="button" onClick={() => select(example)}
            aria-pressed={selected === example} aria-controls={id}
            className={`min-h-12 rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-accent ${selected === example ? "bg-brand text-background hover:bg-foreground" : "border bg-background text-foreground"}`}>
            {services(`${example}.title`)}
          </button>)}
        </div>
      ) : <p className="mt-6 text-sm font-semibold">{services("customSoftware.title")}</p>}
      <div id={id} ref={panel} className="mt-6" aria-label={t("title")}>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-base font-semibold">{t(`${selected}.operation`)}</p>
          {mounted && canAnimate && !reduced && <Button type="button" variant="outline" size="sm" aria-pressed={paused}
            onClick={() => setPaused(value => !value)}>
            {paused ? <PlayIcon aria-hidden="true" /> : <PauseIcon aria-hidden="true" />}
            {t(paused ? "resume" : "pause")}
          </Button>}
          {mounted && (reduced || !canAnimate) && <p className="text-xs text-muted-foreground">{t("static")}</p>}
        </div>
        <div key={selected} className="grid items-start gap-4 lg:grid-cols-2">
          <WorkflowLane example={selected} lane="manual" running={running} reduced={reduced || !canAnimate} mounted={mounted} />
          <WorkflowLane example={selected} lane="optimized" running={running} reduced={reduced || !canAnimate} mounted={mounted} />
        </div>
      </div>
    </div>
  )
}
