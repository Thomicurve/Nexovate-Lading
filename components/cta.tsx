"use client"

import { Button } from "@/components/ui/button"
import { useTranslations } from 'next-intl'

export default function CTA() {
  const t = useTranslations('cta');
  
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
          {t('title')}
        </h2>
        <p className="max-w-[42rem] text-gray-300 font-light sm:text-lg">
          {t('description')}
        </p>
        <Button onClick={() => scrollToSection('contact')} size="lg" className="mt-4">
          {t('button')}
        </Button>
      </div>
    </section>
  )
}

