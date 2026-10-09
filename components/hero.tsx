"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowUpRight"
import { useTranslations } from "next-intl"
import AnimatedBrandMark from "./animated-brand-mark"

export default function Hero() {
  const t = useTranslations("hero")

  return (
    <section id="hero" aria-labelledby="hero-heading"
      className="landing-container relative flex min-h-svh flex-col items-center justify-center gap-8 pb-20 pt-32 text-center md:pb-24 md:pt-40">
      <AnimatedBrandMark />
      <div className="mx-auto max-w-5xl space-y-6">
        <h1 id="hero-heading"
          className="hero-title hero-enter bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text pb-2 text-4xl font-semibold tracking-tight text-transparent md:text-5xl lg:text-7xl">
          {t("title")}
        </h1>
        <p className="hero-copy hero-enter mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
          {t("subtitle")}
        </p>
      </div>
      <div className="hero-actions hero-enter flex flex-col items-center gap-6 sm:flex-row">
        <Button asChild size="lg">
          <a href="#contact">{t("schedule")}<ArrowUpRightIcon aria-hidden="true" /></a>
        </Button>
        <a href="#solutions" className="rounded-lg py-2 text-base font-semibold underline underline-offset-4 transition-colors duration-300 ease-landing hover:text-muted-foreground">
          {t("cta")}
        </a>
      </div>
    </section>
  )
}
