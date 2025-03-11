"use client"

import { Button } from "@/components/ui/button"

export default function CTA() {
  const scrollToSection = (sectionId: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className="border-t">
      <div className="container flex flex-col items-center gap-4 py-24 text-center md:py-32">
        <h2 className="font-bold text-3xl sm:text-3xl md:text-5xl">
          Listo para llevar tu negocio al siguiente nivel?
        </h2>
        <p className="max-w-[42rem] text-gray-300 font-light sm:text-lg">
          Unite a las personas que confían en nosotros para impulsar su transformación digital y mantenerse a la vanguardia del panorama tecnológico en constante evolución.
        </p>
        <Button onClick={() => scrollToSection('contact')} size="lg" className="mt-4">
          Comienza hoy
        </Button>
      </div>
    </section>
  )
}

