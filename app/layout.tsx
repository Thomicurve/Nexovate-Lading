import "./globals.css"
import { Manrope } from "next/font/google"
import type React from "react"
import type { Metadata, Viewport } from "next"
import { getLocale, getTranslations } from "next-intl/server"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" })

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: "metadata" })
  const title = t("title")
  const description = t("description")
  const url = "https://nexovate.net/" + locale

  return {
    metadataBase: new URL("https://nexovate.net"),
    title,
    description,
    keywords: t("keywords"),
    authors: [{ name: "Nexovate" }],
    creator: "Nexovate",
    publisher: "Nexovate",
    robots: "index, follow",
    alternates: {
      canonical: url,
      languages: { es: "/es", en: "/en", "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_AR" : "en_GB",
      alternateLocale: locale === "es" ? "en_GB" : "es_AR",
      url,
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
    icons: {
      icon: [
        { url: "/LogoNexovate.ico?v=d8d4a0de", type: "image/x-icon", sizes: "16x16 32x32 48x48" },
        { url: "/images/brand/nexovate-mark.svg?v=d8d4a0de", type: "image/svg+xml", sizes: "any" },
      ],
    },
    manifest: "/manifest.json",
    applicationName: "Nexovate",
    appleWebApp: { capable: true, title: "Nexovate", statusBarStyle: "black-translucent" },
    formatDetection: { telephone: false },
    category: "technology",
  }
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: "accessibility" })

  return (
    <html lang={locale} className="dark" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${manrope.variable} font-sans bg-background text-foreground antialiased`}>
        <a href="#main-content" className="skip-to-content">
          {t("skipToContent")}
        </a>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

