"use client"

import { useTranslations } from "next-intl"

export default function CTA() {
  const t = useTranslations("cta")
  return (
    <div className="space-y-6">
      <h2 id="contact-heading" className="text-3xl font-semibold tracking-tight md:text-5xl">{t("title")}</h2>
      <p className="landing-copy">{t("description")}</p>
    </div>
  )
}
