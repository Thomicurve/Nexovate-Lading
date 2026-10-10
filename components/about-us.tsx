"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"
import RevealCard from "./reveal-card"

const profiles = [
  { id: "first", photo: "/images/members/member1.webp" },
  { id: "second", photo: "/images/members/member2.webp" },
] as const

export default function AboutUs() {
  const t = useTranslations("about")

  return (
    <section id="about" aria-labelledby="team-heading" className="landing-section relative isolate">
      <span className="decorative-background ambient-light ambient-light-team" aria-hidden="true" />
      <div className="landing-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="max-w-2xl lg:col-span-4">
            <h2 id="team-heading" className="text-3xl font-semibold tracking-tight md:text-4xl">{t("title")}</h2>
            <p className="mt-6 text-base text-muted-foreground">{t("description")}</p>
            <p className="mt-4 text-sm text-muted-foreground">{t("aiNote")}</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
            {profiles.map(({ id, photo }) => {
              const name = t(`members.${id}.name`)
              return (
                <RevealCard key={id} aria-labelledby={`partner-${id}`}
                  className="grid min-w-0 grid-cols-[6rem_1fr] items-start gap-4 sm:grid-cols-1 sm:gap-6">
                  <div className="relative aspect-[4/5] w-full max-w-64 overflow-hidden rounded-xl bg-card">
                    <Image src={photo} alt={t("photoAlt", { name })} fill
                      sizes="(min-width: 640px) 256px, 96px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 id={`partner-${id}`} className="text-xl font-semibold tracking-tight">{name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t(`members.${id}.role`)}</p>
                    <p className="mt-3 max-w-prose text-sm text-muted-foreground">{t(`members.${id}.biography`)}</p>
                  </div>
                </RevealCard>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
