import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import Footer from "@/components/footer"
import Contact from "@/components/contact"
import AboutUs from "@/components/about-us"
import ProjectTimeline from "@/components/project-timeline"
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"
import { locales, type Locale } from "@/app/i18n"
import { languageAlternates, localizedUrl } from "@/lib/seo"

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale }
}): Promise<Metadata> {
  if (!locales.includes(locale)) notFound()
  const t = await getTranslations({ locale, namespace: "metadata" })
  const title = t("title")
  const description = t("description")

  return {
    title,
    description,
    keywords: t("keywords"),
    alternates: {
      canonical: localizedUrl(locale),
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_AR" : "en_GB",
      alternateLocale: locale === "es" ? "en_GB" : "es_AR",
      url: localizedUrl(locale),
      title,
      description,
      siteName: "Nexovate",
      images: [{ url: "/images/brand/nexovate-logo.png", width: 2172, height: 724, type: "image/png", alt: t("imageAlt") }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/brand/nexovate-logo.png"],
    },
  }
}

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <Features />
          <AboutUs />
          <ProjectTimeline />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
