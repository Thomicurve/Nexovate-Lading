"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import Orb from "./blocks/Backgrounds/Orb"

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="relative container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
      <div className="opacity-50 absolute top-32 inset-0 z-0" style={{ width: '100%', height: '600px' }}>
        <Orb
          hoverIntensity={0.1}
          rotateOnHover={true}
          hue={0}
          forceHoverState={true}
        />
      </div>
      <div className="space-y-4 relative z-30">
        <h1 className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
          Automatiza y optimiza tus procesos
          <br />
          con <strong>Nexovate</strong>
        </h1>
        <p className="mx-auto max-w-[52rem] leading-normal text-gray-400 sm:text-xl sm:leading-8">
          Revoluciona tus procesos empresariales con soluciones de <span className="font-bold">inteligencia artificial</span> diseñadas para impulsar la eficiencia y la innovación.
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

