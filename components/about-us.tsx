import { BackgroundPattern } from "@/components/ui/background-pattern"

const AboutUs = () => {
  return (
    <section id="about" className="py-24 relative">
      <BackgroundPattern />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Sobre Nosotros</h2>
          <p className="mt-4 text-lg text-gray-600">
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

