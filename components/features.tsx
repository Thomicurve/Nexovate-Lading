"use client"

import { CodeIcon } from "@phosphor-icons/react/dist/csr/Code"
import { FlowArrowIcon } from "@phosphor-icons/react/dist/csr/FlowArrow"
import { ListChecksIcon } from "@phosphor-icons/react/dist/csr/ListChecks"
import { DatabaseIcon } from "@phosphor-icons/react/dist/csr/Database"
import { useTranslations } from "next-intl"
import ServiceWorkflow from "./service-workflow"

const services = [
  { id: "customSoftware", icon: CodeIcon, wide: true },
  { id: "automation", icon: FlowArrowIcon, wide: false },
  { id: "traceability", icon: ListChecksIcon, wide: false },
  { id: "dataIntegration", icon: DatabaseIcon, wide: true },
] as const

export default function Features() {
  const t = useTranslations("solutions")

  return (
    <section id="solutions" aria-labelledby="services-heading" className="landing-container landing-section relative isolate">
      <span className="decorative-background ambient-light ambient-light-services" aria-hidden="true" />
      <div className="mb-12 grid gap-6 md:grid-cols-12 md:items-end">
        <h2 id="services-heading" className="max-w-2xl text-3xl font-semibold tracking-tight md:col-span-7 md:text-5xl">
          {t("title")}
        </h2>
        <p className="landing-copy md:col-span-5 md:pb-2">{t("description")}</p>
      </div>
      <ServiceWorkflow />
      <div className="grid items-start gap-6 md:grid-cols-12">
        {services.map(({ id, icon: Icon, wide }) => (
          <article key={id} aria-labelledby={`service-${id}`}
            className={`min-w-0 rounded-xl bg-card p-6 ${wide ? "md:col-span-7" : "md:col-span-5"}`}>
            <Icon className="mb-4 h-6 w-6 text-foreground" aria-hidden="true" />
            <h3 id={`service-${id}`} className="text-xl font-semibold tracking-tight md:text-2xl">
              {t(`features.${id}.title`)}
            </h3>
            <p className="mt-3 max-w-prose text-base text-muted-foreground">{t(`features.${id}.description`)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
