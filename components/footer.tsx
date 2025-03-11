'use client'

// import Link from "next/link"
// import { Linkedin, Instagram } from "lucide-react"

export default function Footer() {

  const scrollToSection = (sectionId: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <footer className="border-t">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 space-y-4">
          <h2 className="font-bold">Nexovate</h2>
          <p className="text-sm text-muted-foreground">Ayudamos a hacer crecer tu negocio y a mejorar tus procesos con agentes de IA.</p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 sm:grid-cols-3">
          {/* <div className="space-y-4">
            <h3 className="text-sm font-medium">Soluciones</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/ai-analytics" className="text-muted-foreground transition-colors hover:text-primary">
                  Chatbots
                </Link>
              </li>
              <li>
                <Link href="/cloud-services" className="text-muted-foreground transition-colors hover:text-primary">
                  Automatización de procesos
                </Link>
              </li>
            </ul>
          </div> */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Empresa</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <p onClick={() => scrollToSection('about')} className="cursor-pointer text-muted-foreground transition-colors hover:text-primary">
                  Sobre nosotros
                </p>
              </li>
              <li>
                <p onClick={() => scrollToSection('solutions')} className="cursor-pointer text-muted-foreground transition-colors hover:text-primary">
                  Soluciones
                </p>
              </li>
              <li>
                <p onClick={() => scrollToSection('contact')} className="cursor-pointer text-muted-foreground transition-colors hover:text-primary">
                  Contacto
                </p>
              </li>
            </ul>
          </div>
          {/* <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://www.linkedin.com/company/nexovate"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://www.instagram.com/nexovate"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div> */}
        </div>
      </div>
      <div className="container border-t py-6">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Nexovate, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

