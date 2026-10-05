"use client"
import { useTranslations } from "next-intl"
import { motion } from "framer-motion"
import { MessageCircle, ListChecks, Code2, Handshake } from "lucide-react"

const ProjectTimeline = () => {
  const t = useTranslations("timeline");
  
  return (
    <section id="process" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center">{t("title")}</h2>
        <p className="text-center mt-4">{t("description")}</p>
        
        <div className="mt-16 relative">
          {/* Línea vertical del timeline - cambiada a blanca */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-900"></div>
          
          <div className="space-y-12">
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row">
              <motion.div 
                className="md:w-1/2 md:pr-8 mb-4 md:mb-0"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-background/80 border border-blue-600/20 rounded-lg p-6 shadow-lg">
                  <div className="flex items-center mb-2">
                    <MessageCircle size={24} className="text-blue-500 mr-3 flex-shrink-0" aria-hidden="true" />
                    <h3 className="text-xl font-bold text-blue-500">{t("steps.step1.title")}</h3>
                  </div>
                  <p className="text-gray-300">{t("steps.step1.description")}</p>
                </div>
              </motion.div>
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 border-2 border-background">
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white">1</span>
              </div>
              <div className="md:w-1/2 md:pl-8"></div>
            </div>
            
            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-1/2 md:pr-8"></div>
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 border-2 border-background">
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white">2</span>
              </div>
              <motion.div 
                className="md:w-1/2 md:pl-8 mb-4 md:mb-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-background/80 border border-blue-600/20 rounded-lg p-6 shadow-lg">
                  <div className="flex items-center mb-2">
                    <ListChecks size={24} className="text-blue-500 mr-3 flex-shrink-0" aria-hidden="true" />
                    <h3 className="text-xl font-bold text-blue-500">{t("steps.step2.title")}</h3>
                  </div>
                  <p className="text-gray-300">{t("steps.step2.description")}</p>
                </div>
              </motion.div>
            </div>
            
            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row">
              <motion.div 
                className="md:w-1/2 md:pr-8 mb-4 md:mb-0"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-background/80 border border-blue-600/20 rounded-lg p-6 shadow-lg">
                  <div className="flex items-center mb-2">
                    <Code2 size={24} className="text-blue-500 mr-3 flex-shrink-0" aria-hidden="true" />
                    <h3 className="text-xl font-bold text-blue-500">{t("steps.step3.title")}</h3>
                  </div>
                  <p className="text-gray-300">{t("steps.step3.description")}</p>
                </div>
              </motion.div>
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 border-2 border-background">
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white">3</span>
              </div>
              <div className="md:w-1/2 md:pl-8"></div>
            </div>
            
            {/* Step 4 */}
            <div className="relative flex flex-col md:flex-row">
              <div className="md:w-1/2 md:pr-8"></div>
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 border-2 border-background">
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-white">4</span>
              </div>
              <motion.div 
                className="md:w-1/2 md:pl-8 mb-4 md:mb-0"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="bg-background/80 border border-blue-600/20 rounded-lg p-6 shadow-lg">
                  <div className="flex items-center mb-2">
                    <Handshake size={24} className="text-blue-500 mr-3 flex-shrink-0" aria-hidden="true" />
                    <h3 className="text-xl font-bold text-blue-500">{t("steps.step4.title")}</h3>
                  </div>
                  <p className="text-gray-300">{t("steps.step4.description")}</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectTimeline
