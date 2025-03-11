import "./globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import MouseMoveEffect from "@/components/mouse-move-effect"
import { Toaster } from "@/components/ui/toaster"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nexovate - Automatización de procesos con IA y n8n",
  description: "Nexovate es un emprendimiento de Argentina que ofrece soluciones de automatización de procesos con inteligencia artificial y n8n para mejorar la eficiencia y aumentar la productividad en tu negocio. Desde 2024, nos dedicamos a crear soluciones personalizadas que no solo automatizan tareas repetitivas, sino que también aceleran todo el proceso de venta desde la prospección hasta el cierre de clientes.",
  icons: {
    icon: "/LogoNexovate.ico",
  },
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <MouseMoveEffect />
        {children}
        <Toaster />
      </body>
    </html>
  )
}

