"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import Orb from "./blocks/Backgrounds/Orb"
import { useTranslations } from 'next-intl'
import AnimatedBrandMark from "./animated-brand-mark"

export default function Hero() {
  const t = useTranslations('hero');
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section 
      id="hero" 
      className="relative container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none opacity-35 absolute top-24 inset-x-0 z-0 h-[500px] md:h-[600px]" aria-hidden="true">
        <Orb
          hoverIntensity={0.1}
          rotateOnHover={true}
          hue={0}
          forceHoverState={true}
        />
      </div>
      <div className="mx-auto max-w-[1000px] space-y-6 relative z-30">
        <AnimatedBrandMark />
        <h1 
          id="hero-heading"
          className="bg-gradient-to-br from-foreground from-30% via-foreground/90 to-foreground/70 bg-clip-text text-4xl font-bold leading-[1.08] tracking-tight text-transparent md:text-5xl lg:text-[64px] pb-3"
        >
          {t('title')}
        </h1>
        <p className="mx-auto max-w-[760px] font-light text-base leading-7 text-gray-200 sm:text-lg sm:leading-8">
          {t('subtitle')}
        </p>
      </div>
      <div className="relative z-30 flex gap-4 justify-center flex-wrap">
        <AnimatedSection delay={100}>
          <Button 
            className="hover:translate-y-[-2px] transition-transform duration-200 ease-in-out" 
            onClick={() => scrollToSection('contact')}
            size="lg"
            aria-label={t('schedule')}
          >
            {t('schedule')}
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Button>
        </AnimatedSection>
        <AnimatedSection delay={200}>
          <Button 
            className="hover:translate-y-[-2px] transition-transform duration-200 ease-in-out" 
            onClick={() => scrollToSection('solutions')}
            variant="outline" 
            size="lg"
            aria-label={t('cta')}
          >
            {t('cta')}
          </Button>
        </AnimatedSection>
      </div>
    </section>
  )
}

