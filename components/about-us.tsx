"use client"
import Squares from "./blocks/Backgrounds/Squares"
import { useTranslations } from 'next-intl'

const AboutUs = () => {
  const t = useTranslations('about');
  
  return (
    <section id="about" className="py-24 relative min-h-[60vh] flex items-center justify-center">
      <div className="absolute inset-0 opacity-30">
      <Squares 
        speed={0.2} 
        squareSize={40}
        direction='diagonal'
        borderColor='#1A5EFF'
        hoverFillColor='#222'
        />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-30 h-full">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-100 sm:text-4xl">{t('title')}</h2>
          <p className="text-center mt-4 font-light text-lg text-gray-200" dangerouslySetInnerHTML={{ __html: t('description')
            .replace('automatización con n8n', '<b class="text-[#1A5EFF]">automatización con n8n</b>') 
          }} />
        </div>
      </div>
    </section>
  )
}

export default AboutUs

