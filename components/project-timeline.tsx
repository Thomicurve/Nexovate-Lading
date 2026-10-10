"use client"

import { useTranslations } from "next-intl"
import { ChatCircleIcon } from "@phosphor-icons/react/dist/csr/ChatCircle"
import { ListChecksIcon } from "@phosphor-icons/react/dist/csr/ListChecks"
import { CodeIcon } from "@phosphor-icons/react/dist/csr/Code"
import { HandshakeIcon } from "@phosphor-icons/react/dist/csr/Handshake"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

const steps = [
  { key: "step1", icon: ChatCircleIcon },
  { key: "step2", icon: ListChecksIcon },
  { key: "step3", icon: CodeIcon },
  { key: "step4", icon: HandshakeIcon },
] as const

export default function ProjectTimeline() {
  const t = useTranslations("timeline")
  const [entered, ref] = useIntersectionObserver<HTMLOListElement>({ threshold: 0.1 })

  return (
    <section id="process" aria-labelledby="process-heading" className="landing-section relative isolate">
      <span className="decorative-background process-dot-field" aria-hidden="true" />
      <div className="landing-container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="process-heading" className="text-3xl font-semibold tracking-tight md:text-4xl">{t("title")}</h2>
          <p className="mt-4 text-base text-muted-foreground">{t("description")}</p>
        </div>
        <ol role="list" ref={ref} className={`mx-auto mt-16 max-w-5xl ${entered ? "process-enter" : ""}`}>
          {steps.map(({ key, icon: Icon }, index) => (
            <li key={key} className="relative grid grid-cols-[2rem_1fr] items-start gap-4 pb-12 last:pb-0 md:grid-cols-[1fr_2rem_1fr] md:gap-8">
              {index < steps.length - 1 && (
                <span className="process-connector absolute bottom-0 left-4 top-4 w-px bg-border md:left-1/2" aria-hidden="true">
                  <span className="process-progress absolute inset-0 origin-top bg-brand" />
                </span>
              )}
              <span className="process-marker relative z-10 col-start-1 row-start-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-semibold text-background md:col-start-2" aria-hidden="true">
                {index + 1}
              </span>
              <div className={`col-start-2 row-start-1 min-w-0 ${index % 2 === 0 ? "md:col-start-1 md:text-right" : "md:col-start-3"}`}>
                <div className={`mb-3 flex items-center gap-3 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                  <Icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                  <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{t(`steps.${key}.title`)}</h3>
                </div>
                <p className="max-w-prose text-base text-muted-foreground">{t(`steps.${key}.description`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
