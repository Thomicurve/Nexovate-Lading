"use client"

import Cal, { getCalApi } from "@calcom/embed-react"
import { ArrowUpRightIcon, CalendarBlankIcon } from "@phosphor-icons/react"
import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { buttonVariants } from "@/components/ui/button"

type CalendarState = "loading" | "ready" | "error" | "timeout"
const calLink = "nexovate-o7uzwd/15min"
const namespace = "15min"
const embedScript = "https://app.cal.com/embed/embed.js"

export default function Calendar() {
  const t = useTranslations("contact.calendar")
  const [state, setState] = useState<CalendarState>("loading")
  const [apiReady, setApiReady] = useState(false)

  useEffect(() => {
    let active = true
    let unsubscribe: (() => void) | undefined
    const timeout = window.setTimeout(() => {
      if (active) setState(current => current === "loading" ? "timeout" : current)
    }, 15000)
    const fail = () => {
      if (!active) return
      window.clearTimeout(timeout)
      setState("error")
    }
    const ready = () => {
      if (!active) return
      window.clearTimeout(timeout)
      setState("ready")
    }
    const scriptError = (event: Event) => {
      if (event.target instanceof HTMLScriptElement && event.target.src === embedScript) fail()
    }
    window.addEventListener("error", scriptError, true)
    getCalApi({ namespace }).then(cal => {
      if (!active) return
      cal("on", { action: "linkReady", callback: ready })
      cal("on", { action: "linkFailed", callback: fail })
      unsubscribe = () => {
        cal("off", { action: "linkReady", callback: ready })
        cal("off", { action: "linkFailed", callback: fail })
      }
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: { dark: { "cal-brand": "#2D78FF" }, light: { "cal-brand": "#2D78FF" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      })
      setApiReady(true)
    }).catch(fail)
    return () => {
      active = false
      window.clearTimeout(timeout)
      window.removeEventListener("error", scriptError, true)
      unsubscribe?.()
    }
  }, [])

  return (
    <div data-calendar-state={state}>
      <div className="space-y-4 p-4 md:p-6">
        <div id="calendar-status" role="status" aria-live="polite" className="flex items-start gap-3">
          <CalendarBlankIcon size={24} aria-hidden="true" className="shrink-0 text-muted-foreground" />
          <p className="text-sm leading-6 text-muted-foreground">{t(state)}</p>
        </div>
        <noscript>
          <style>{"#calendar-status { display: none; }"}</style>
          <p className="text-sm leading-6 text-muted-foreground">{t("noScript")}</p>
        </noscript>
        <a href={`https://cal.com/${calLink}`} target="_blank" rel="noopener noreferrer"
          className={buttonVariants({ variant: "outline" })}>
          {t("direct")}<ArrowUpRightIcon aria-hidden="true" />
        </a>
      </div>
      <div aria-busy={state === "loading"} className="calendar-embed min-w-0 px-2 pb-2 md:px-4 md:pb-4">
        {apiReady && <Cal namespace={namespace} calLink={calLink}
          style={{ width: "100%", height: "100%", overflow: "auto" }}
          config={{ layout: "month_view", theme: "dark" }} />}
      </div>
    </div>
  )
}
