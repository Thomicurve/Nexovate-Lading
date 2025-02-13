"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AnimatedSection } from "./animated-section"

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
      <div className="space-y-4">
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Automatiza y optimiza tus procesos
          <br />
          con Nexovate
        </h1>
        <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Revoluciona tus procesos empresariales con soluciones de <span className="text-[#1A5EFF]">inteligencia artificial</span> diseñadas para impulsar la eficiencia y la innovación.
        </p>
      </div>
      <div className="flex gap-4 justify-center flex-wrap">
        <AnimatedSection delay={100}>
          <Button className="hover:translate-y-[-2px] transition-transform duration-200 ease-in-out" onClick={() => scrollToSection('solutions')} size="lg">
            Explorar Soluciones
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <Button className="hover:translate-y-[-2px] transition-transform duration-200 ease-in-out" onClick={() => scrollToSection('contact')} variant="outline" size="lg">
            Agendar una llamada
          </Button>
        </AnimatedSection>
      </div>
    </section>
  )
}

