"use client"
import { Brain, Cloud, Shield, Zap } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import PixelCard from "@/components/blocks/Components/PixelCard"
import { useTranslations } from 'next-intl'

export default function Features() {
  const t = useTranslations('solutions');
  
  const features = [
    {
      name: t('features.sales.title'),
      description: t('features.sales.description'),
      icon: Brain,
    },
    {
      name: t('features.automation.title'),
      description: t('features.automation.description'),
      icon: Cloud,
    },
    {
      name: t('features.security.title'),
      description: t('features.security.description'),
      icon: Shield,
    },
    {
      name: t('features.agents.title'),
      description: t('features.agents.description'),
      icon: Zap,
    },
  ]

  return (
    <section id="solutions" className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <AnimatedSection delay={100}>
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">{t('title')}</h2>
        </AnimatedSection>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          {t('description')}
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
        {features.map((feature, index) => (
          <AnimatedSection delay={100 + index * 100} key={feature.name}>
            <PixelCard className="w-full bg-background" colors="#1F2223,#19A7FF,#1A5EFF">
              <div className="absolute overflow-hidden p-8 h-full w-full bg-[#09090B] bg-opacity-60">
                <div className="flex items-center gap-4">
                  <feature.icon className="h-8 w-8" />
                  <h3 className="font-bold">{feature.name}</h3>
                </div>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </div>
            </PixelCard>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}

