'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const scrollToSection = (sectionId: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="#hero" onClick={(e) => scrollToSection('hero', e)} className="mr-6 flex items-center space-x-2">
          <span className="font-bold">Nexovate</span>
        </Link>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          <Link 
            href="#solutions" 
            className="transition-colors hover:text-primary"
            onClick={(e) => scrollToSection('solutions', e)}
          >
            Soluciones
          </Link>
          <Link 
            href="#clients" 
            className="transition-colors hover:text-primary"
            onClick={(e) => scrollToSection('clients', e)}
          >
            Clientes
          </Link>
          <Link 
            href="#about" 
            className="transition-colors hover:text-primary"
            onClick={(e) => scrollToSection('about', e)}
          >
            Sobre nosotros
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Button onClick={() => scrollToSection('contact')} variant="ghost" size="sm">
            Contacto
          </Button>
          <Button size="sm">Agendar una llamada</Button>
        </div>
      </div>
    </header>
  )
}

