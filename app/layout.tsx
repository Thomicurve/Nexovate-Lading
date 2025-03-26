import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import MouseMoveEffect from "@/components/mouse-move-effect"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nexovate - Automatización de procesos con IA y n8n",
  description: "Nexovate es un emprendimiento de Argentina que ofrece soluciones de automatización de procesos con IA y n8n para aumentar la productividad en tu negocio.",
  keywords: "automatización, inteligencia artificial, IA, n8n, procesos empresariales, chatbots, eficiencia, productividad, Argentina, agentes IA, optimización de procesos",
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
    title: "Nexovate - Automatización de procesos con IA y n8n",
    description: "Soluciones de automatización con inteligencia artificial y n8n para mejorar la eficiencia y productividad de tu negocio",
    siteName: "Nexovate",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nexovate - Automatización de procesos con IA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexovate - Automatización de procesos con IA y n8n",
    description: "Soluciones de automatización con inteligencia artificial y n8n para mejorar la eficiencia y productividad de tu negocio",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/LogoNexovate.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  themeColor: "#1A5EFF",
  applicationName: "Nexovate",
  appleWebApp: {
    capable: true,
    title: "Nexovate",
    statusBarStyle: "black-translucent",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  formatDetection: {
    telephone: false,
  },
  category: "technology",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="dark" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1A5EFF" />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <MouseMoveEffect />
        <a href="#hero" className="skip-to-content sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground">
          Skip to main content
        </a>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

