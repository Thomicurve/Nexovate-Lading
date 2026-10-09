"use client"

import { useTranslations } from "next-intl"
import CTA from "@/components/cta"
import Calendar from "@/components/calendar"
import ChatButton from "@/components/chatButton"

export default function Contact() {
  const t = useTranslations("contact")
  return (
    <section id="contact" aria-labelledby="contact-heading" className="landing-section border-t">
      <div className="landing-container grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-8 lg:col-span-4">
          <CTA />
          <div className="space-y-4 border-t pt-6">
            <p className="landing-copy">{t("whatsappDescription")}</p>
            <ChatButton />
          </div>
        </div>
        <div id="calendar" className="min-w-0 rounded-xl border bg-card lg:col-span-8">
          <div className="space-y-2 border-b p-4 md:p-6">
            <h3 className="text-xl font-semibold">{t("calendar.title")}</h3>
            <p className="landing-copy">{t("calendar.description")}</p>
          </div>
          <Calendar />
        </div>
      </div>
    </section>
  )
}
