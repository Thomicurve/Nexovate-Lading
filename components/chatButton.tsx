"use client"

import { useEffect, useState } from "react"
import { WhatsappLogoIcon } from "@phosphor-icons/react"
import { useTranslations } from "next-intl"

export default function ChatButton() {
  const t = useTranslations("contact")
  const [floating, setFloating] = useState(false)

  useEffect(() => {
    const contact = document.getElementById("contact")
    if (!contact || !("IntersectionObserver" in window)) return
    const observer = new IntersectionObserver(([entry]) => {
      setFloating(!entry.isIntersecting && entry.boundingClientRect.top > window.innerHeight)
    }, { rootMargin: "200px 0px", threshold: 0 })
    observer.observe(contact)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-12">
      <a href="https://wa.me/message/QEX2LSMCN5A6D1" target="_blank" rel="noopener noreferrer"
        aria-label={t("whatsapp")} data-whatsapp-floating={floating}
        className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-full border bg-card px-4 text-foreground transition-colors hover:bg-accent ${floating ? "whatsapp-floating h-12 w-12 px-0" : ""}`}>
        <WhatsappLogoIcon size={24} aria-hidden="true" />
        <span className={floating ? "sr-only" : "text-sm font-medium"}>{t("whatsapp")}</span>
      </a>
    </div>
  )
}
