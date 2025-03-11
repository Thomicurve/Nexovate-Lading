"use client"
import { Brain, Cloud, Shield, Zap } from "lucide-react"
import { AnimatedSection } from "./animated-section"
import PixelCard from "@/components/blocks/Components/PixelCard"

const features = [
  {
    name: "Optimización de ventas",
    description: "Aprovecha el poder de la inteligencia artificial y de n8n para automatizar y mejorar cada etapa del proceso de ventas, desde la prospección hasta el cierre de clientes.",
    icon: Brain,
  },
  {
    name: "Automatización de procesos",
    description: "Implementación de chatbots, RAGs y CRMs inteligentes que optimizan la gestión de clientes e incrementan la eficiencia de tu negocio.",
    icon: Cloud,
  },
  {
    name: "Soluciones seguras y escalables",
    description: "Nuestras soluciones garantizan la seguridad y escalabilidad necesarias para que tu negocio crezca sin limitaciones, integrándose con tu infraestructura actual.",
    icon: Shield,
  },
  {
    name: "Agentes de IA de alto rendimiento",
    description: "Agentes de inteligencia artificial diseñados para potenciar tu negocio con velocidad, precisión y disponibilidad 24/7, asegurando una experiencia fluida para tus clientes.",
    icon: Zap,
  },
]

export default function Features() {
  return (
    <section id="solutions" className="container space-y-16 py-24 md:py-32">
      <div className="mx-auto max-w-[58rem] text-center">
        <AnimatedSection delay={100}>
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Soluciones de <span className="text-[#1A5EFF]">IA</span></h2>
        </AnimatedSection>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Descubre cómo Nexovate puede ayudar a escalar tu negocio con agentes de inteligencia artificial.
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

