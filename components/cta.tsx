import { Button } from "@/components/ui/button"

export default function CTA() {
  return (
    <section className="border-t">
      <div className="container flex flex-col items-center gap-4 py-24 text-center md:py-32">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Listo para revolucionar tu negocio?
        </h2>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Únete a las empresas líderes que confían en Nexovate para impulsar su transformación digital y mantenerse a la vanguardia del panorama tecnológico en constante evolución.
        </p>
        <Button size="lg" className="mt-4">
          Comienza hoy
        </Button>
      </div>
    </section>
  )
}

