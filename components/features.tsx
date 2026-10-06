"use client"
import { Code2, Workflow, ClipboardList, Database } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import PixelCard from "@/components/blocks/Components/PixelCard"
import { useTranslations } from 'next-intl'

export default function Features() {
  const t = useTranslations('solutions');
  
  const features = [
    {
      name: t('features.customSoftware.title'),
      description: t('features.customSoftware.description'),
      icon: Code2,
    },
    {
      name: t('features.automation.title'),
      description: t('features.automation.description'),
      icon: Workflow,
    },
    {
      name: t('features.traceability.title'),
      description: t('features.traceability.description'),
      icon: ClipboardList,
    },
    {
      name: t('features.dataIntegration.title'),
      description: t('features.dataIntegration.description'),
      icon: Database,
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
      <div className="mx-auto grid max-w-[1080px] grid-cols-1 gap-6 md:grid-cols-2">
        {features.map((feature, index) => (
          <AnimatedSection delay={100 + index * 100} key={feature.name}>
            <PixelCard noFocus className="!h-auto min-h-[280px] md:min-h-[224px] !w-full !aspect-auto bg-background [&>canvas]:absolute [&>canvas]:inset-0" colors="#1F2223,#19A7FF,#1A5EFF">
              <div className="relative z-10 p-6 h-full w-full bg-[#09090B] bg-opacity-60">
                <div className="flex items-center gap-4">
                  <feature.icon className="h-8 w-8 flex-shrink-0 text-blue-400" aria-hidden="true" />
                  <h3 className="text-lg font-bold">{feature.name}</h3>
                </div>
                <p className="mt-4 leading-7 text-muted-foreground">{feature.description}</p>
              </div>
            </PixelCard>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}

