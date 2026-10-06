"use client"
import { useTranslations } from "next-intl"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowDown, MessageCircle, ListChecks, Code2, Handshake } from "lucide-react"

const ProjectTimeline = () => {
  const t = useTranslations("timeline")
  const reducedMotion = useReducedMotion()
  const steps = [
    { key: "step1", icon: MessageCircle },
    { key: "step2", icon: ListChecks },
    { key: "step3", icon: Code2 },
    { key: "step4", icon: Handshake },
  ] as const

  return (
    <section id="process" className="py-24 relative overflow-x-clip">
      <div className="max-w-6xl mx-auto px-6 md:px-4">
        <h2 className="text-3xl font-bold text-center">{t("title")}</h2>
        <p className="text-center mt-4">{t("description")}</p>

        <div className="mt-16 relative">
          <div aria-hidden="true" className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-900" />

          <ol role="list" className="md:space-y-12">
            {steps.map((step, index) => (
              <li key={step.key}>
                <div className="relative flex flex-col md:flex-row">
                  {index % 2 === 1 && <div className="hidden md:block md:w-1/2 md:pr-8" />}
                  <motion.div
                    className={`w-full md:w-1/2 [--timeline-entry-x:0px] ${index % 2 === 0 ? "md:pr-8 md:[--timeline-entry-x:-50px]" : "md:pl-8 md:[--timeline-entry-x:50px]"}`}
                    initial={reducedMotion ? false : { opacity: 0, x: "var(--timeline-entry-x)" }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="bg-background/80 border border-blue-600/20 rounded-lg p-5 md:p-6 shadow-lg">
                      <div className="flex items-center mb-2">
                        <span aria-hidden="true" className="md:hidden mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                          {index + 1}
                        </span>
                        <step.icon size={24} className="text-blue-500 mr-3 flex-shrink-0" aria-hidden="true" />
                        <h3 className="text-xl font-bold text-blue-500">{t(`steps.${step.key}.title`)}</h3>
                      </div>
                      <p className="text-gray-300">{t(`steps.${step.key}.description`)}</p>
                    </div>
                  </motion.div>
                  <div aria-hidden="true" className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 border-2 border-background">
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white">{index + 1}</span>
                  </div>
                  {index % 2 === 0 && <div className="hidden md:block md:w-1/2 md:pl-8" />}
                </div>
                {index < steps.length - 1 && (
                  <div aria-hidden="true" className="flex h-12 items-center justify-center md:hidden">
                    <ArrowDown className="h-8 w-6 text-blue-500" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default ProjectTimeline
