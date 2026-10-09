"use client"

import { useTranslations } from "next-intl"
import BrandLogo from "@/components/brand-logo"

export default function Footer() {
  const t = useTranslations("footer")
  const a11y = useTranslations("accessibility")
  return (
    <footer className="border-t" aria-label={a11y("footer")}>
      <div className="landing-container flex flex-col gap-8 py-8 md:flex-row md:items-start md:justify-between md:py-12">
        <div className="max-w-sm space-y-4">
          <a href="#main-content" className="inline-block"><BrandLogo placement="footer" /></a>
          <p className="text-sm leading-6 text-muted-foreground">{t("tagline")}</p>
        </div>
        <nav aria-label={t("company")}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li><a href="#solutions" className="inline-flex min-h-12 items-center hover:underline underline-offset-4">{t("solutionsLink")}</a></li>
            <li><a href="#about" className="inline-flex min-h-12 items-center hover:underline underline-offset-4">{t("aboutLink")}</a></li>
            <li><a href="#contact" className="inline-flex min-h-12 items-center hover:underline underline-offset-4">{t("contactLink")}</a></li>
          </ul>
        </nav>
      </div>
      <div className="landing-container border-t py-6">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} {t("copyright")}</p>
      </div>
    </footer>
  )
}
