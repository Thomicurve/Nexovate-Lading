import "./globals.css"
import { Manrope } from "next/font/google"
import type React from "react"
import type { Metadata, Viewport } from "next"
import { getLocale, getTranslations } from "next-intl/server"
import MouseMoveEffect from "@/components/mouse-move-effect"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" })

export const metadata: Metadata = {
  title: "Nexovate - Software a medida y automatización de procesos",
  description: "Creamos software a medida para automatizar tareas, seguir procesos y reunir tus datos en un solo lugar. Más claridad para trabajar y decidir.",
  keywords: "software a medida, automatización de procesos, trazabilidad, datos centralizados, integraciones, sistemas internos, procesos empresariales, Argentina",
  authors: [{ name: "Nexovate" }],
  creator: "Nexovate",
  publisher: "Nexovate",
  robots: "index, follow",
  alternates: {
    canonical: "https://nexovate.net",
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://nexovate.net",
    title: "Nexovate - Software a medida y automatización de procesos",
    description: "Software para automatizar tareas, dar seguimiento a tus procesos y conectar los datos de tu operación.",
    siteName: "Nexovate",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nexovate - Software a medida y automatización de procesos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexovate - Software a medida y automatización de procesos",
    description: "Software para automatizar tareas, dar seguimiento a tus procesos y conectar los datos de tu operación.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/LogoNexovate.ico?v=d8d4a0de", type: "image/x-icon", sizes: "16x16 32x32 48x48" },
      { url: "/images/brand/nexovate-mark.svg?v=d8d4a0de", type: "image/svg+xml", sizes: "any" },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  applicationName: "Nexovate",
  appleWebApp: {
    capable: true,
    title: "Nexovate",
    statusBarStyle: "black-translucent",
  },
  formatDetection: {
    telephone: false,
  },
  category: "technology",
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
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${manrope.variable} font-sans bg-background text-foreground antialiased`}>
        <MouseMoveEffect />
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

