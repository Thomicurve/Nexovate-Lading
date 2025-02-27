"use client"
import Squares from "./blocks/Backgrounds/Squares"

const AboutUs = () => {
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-50 h-full">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-100 sm:text-4xl">Sobre Nosotros</h2>
          <p className="mt-4 text-lg text-gray-300">
            Somos una empresa argentina que ofrece soluciones de automatización de procesos con IA para mejorar la eficiencia y la precisión en diversas industrias.
            Nuestro objetivo es ayudar a las empresas a automatizar sus procesos y mejorar su eficiencia.
            Comenzamos con la automatización de procesos de ventas y marketing, pero estamos expandiendo nuestras soluciones para incluir otras industrias.
          </p>
        </div>
      </div>
    </section>
  )
}

export default AboutUs

