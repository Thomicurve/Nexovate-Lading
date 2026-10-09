"use client"

import { useId, useState } from "react"
import { useTranslations } from "next-intl"
import { ArrowRightIcon } from "@phosphor-icons/react/dist/csr/ArrowRight"
import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/csr/ArrowsClockwise"
import { CheckCircleIcon } from "@phosphor-icons/react/dist/csr/CheckCircle"
import { TableIcon } from "@phosphor-icons/react/dist/csr/Table"
import { DatabaseIcon } from "@phosphor-icons/react/dist/csr/Database"
import { SquaresFourIcon } from "@phosphor-icons/react/dist/csr/SquaresFour"
import { Button } from "@/components/ui/button"

export type ServiceType = "customSoftware" | "automation" | "traceability" | "dataIntegration"

function Status({ children, active }: { children: React.ReactNode; active: boolean }) {
  return <span className={`inline-flex items-center gap-2 rounded-lg px-2 py-1 text-xs font-semibold ${active ? "bg-brand text-background" : "bg-secondary text-foreground"}`}>{children}</span>
}

export function ServiceIllustration({ type }: { type: ServiceType }) {
  const t = useTranslations("solutions.examples")
  const [changed, setChanged] = useState(false)
  const id = useId()
  const labels = (key: string) => t(`${type}.${key}`)

  return (
    <div className="mt-6">
      <p className="mb-3 text-xs text-muted-foreground">{t("illustrative")}</p>
      <div id={id} className="rounded-lg border border-border bg-background p-4">
        <div key={String(changed)} className="service-change">
          {type === "customSoftware" && (
            <div className="grid min-w-0 gap-4 sm:grid-cols-4">
              <div className="border-b border-border pb-3 text-xs text-muted-foreground sm:col-span-1 sm:border-b-0 sm:pb-0">
                <SquaresFourIcon className="mb-2 h-5 w-5 text-foreground" aria-hidden="true" />
                {labels("workspace")}
              </div>
              <div className="min-w-0 space-y-3 sm:col-span-3">
                <p className="text-sm font-semibold">{labels("screen")}</p>
                <div className="space-y-3 rounded-lg bg-card p-3">
                  <p className="text-sm">{labels("request")}</p>
                  <Status active={changed}>{labels(changed ? "assigned" : "unassigned")}</Status>
                  <p className="text-xs text-muted-foreground">{labels("owner")}</p>
                </div>
              </div>
            </div>
          )}
          {type === "automation" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">{labels("screen")}</p>
                <Status active={changed}>{labels(changed ? "connected" : "manual")}</Status>
              </div>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                <div className="min-w-0 rounded-lg bg-card p-3 text-xs">{labels("source")}</div>
                <ArrowRightIcon className={`h-4 w-4 ${changed ? "text-foreground" : "text-muted-foreground"}`} aria-hidden="true" />
                <div className="min-w-0 rounded-lg bg-card p-3 text-xs">
                  {labels(changed ? "created" : "pending")}
                </div>
              </div>
            </div>
          )}
          {type === "traceability" && (
            <div className="space-y-4">
              <p className="text-sm font-semibold">{labels("screen")}</p>
              <div className="flex flex-wrap items-center gap-2">
                <Status active={changed}>{labels(changed ? "inProgress" : "review")}</Status>
                <span className="text-xs text-muted-foreground">{labels("owner")}</span>
              </div>
              <ol className="space-y-3 text-xs">
                <li className="flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 shrink-0" aria-hidden="true" />{labels("received")}</li>
                <li className={`flex items-center gap-2 ${changed ? "text-foreground" : "text-muted-foreground"}`}>
                  <span className={`h-2 w-2 shrink-0 rounded-full ${changed ? "bg-brand" : "bg-muted-foreground"}`} aria-hidden="true" />
                  {labels(changed ? "assigned" : "awaiting")}
                </li>
              </ol>
            </div>
          )}
          {type === "dataIntegration" && (
            <div className="space-y-4">
              <p className="text-sm font-semibold">{labels("screen")}</p>
              <div className="grid grid-cols-3 gap-2 break-words text-center text-xs">
                <div className="min-w-0 rounded-lg bg-card p-3"><TableIcon className="mx-auto mb-2 h-5 w-5" aria-hidden="true" />{labels("spreadsheet")}</div>
                <div className="min-w-0 rounded-lg bg-card p-3"><DatabaseIcon className="mx-auto mb-2 h-5 w-5" aria-hidden="true" />{labels("system")}</div>
                <div className={`min-w-0 rounded-lg p-3 ${changed ? "bg-brand text-background" : "bg-card"}`}>
                  <SquaresFourIcon className="mx-auto mb-2 h-5 w-5" aria-hidden="true" />{labels(changed ? "shared" : "separate")}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button type="button" variant="outline" size="sm" aria-pressed={changed} aria-controls={id}
          aria-label={`${t("viewChange")}: ${t(`${type}.screen`)}`}
          onClick={() => setChanged((current) => !current)}>
          <ArrowsClockwiseIcon aria-hidden="true" />{t("viewChange")}
        </Button>
        <span className="text-xs text-muted-foreground">{t(changed ? "resetHint" : "changeHint")}</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground" aria-live="polite" aria-atomic="true">
        {labels(changed ? "after" : "before")}
      </p>
    </div>
  )
}
