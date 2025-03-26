'use client'

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from 'next-intl'
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { locales } from "@/app/i18n"

const flagImages = {
  es: "/images/flags/es.svg",
  en: "/images/flags/gb.svg"
};

export default function Navbar() {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);
  // const myDivRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (sectionId: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }

  const openMenu = () => {
    setRenderMenu(true);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setTimeout(() => setRenderMenu(false), 100);
  };

  const handleLinkClick = (sectionId: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
    scrollToSection(sectionId, e);
    closeMenu();
  }

  // Función para cambiar de idioma
  const handleLanguageChange = (newLocale: string) => {
    // Obtener la ruta sin el locale actual
    const pathWithoutLocale = pathname.replace(/^\/[^\/]+/, '');
    // Si no hay ruta después del locale, redireccionar a la raíz
    const redirectPath = pathWithoutLocale || '/';
    // Redireccionar a la misma ruta con el nuevo locale
    window.location.href = `/${newLocale}${redirectPath}`;
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <Link 
            href="#hero" 
            onClick={(e) => scrollToSection('hero', e)} 
            className="mr-6 flex items-center space-x-2"
            aria-label="Nexovate - Inicio"
          >
            <span className="font-bold">Nexovate</span>
          </Link>
          
          {/* Menú de navegación para escritorio */}
          <nav className="hidden md:flex flex-1 items-center space-x-6 text-sm font-medium" aria-label="Navegación principal">
            <Link 
              href="#solutions" 
              className="transition-colors hover:text-primary"
              onClick={(e) => scrollToSection('solutions', e)}
              aria-label="Ver nuestras soluciones"
            >
              {t('solutions')}
            </Link>
            {/* <Link 
              href="#clients" 
              className="transition-colors hover:text-primary"
              onClick={(e) => scrollToSection('clients', e)}
            >
              Clientes
            </Link> */}
            <Link 
              href="#about" 
              className="transition-colors hover:text-primary"
              onClick={(e) => scrollToSection('about', e)}
              aria-label="Conocer más sobre nosotros"
            >
              {t('about')}
            </Link>
          </nav>

          {/* Botones para escritorio */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              onClick={() => scrollToSection('contact')} 
              variant="ghost" 
              size="sm"
              aria-label="Ir a la sección de contacto"
            >
              {t('contact')}
            </Button>
            
            {/* Selector de idioma para escritorio */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-2"
                  aria-label="Seleccionar idioma"
                >
                  <Image 
                    src={flagImages[locale as keyof typeof flagImages]} 
                    alt={locale === 'es' ? 'Bandera española' : 'British flag'} 
                    width={20} 
                    height={15} 
                    className="rounded-sm"
                  />
                  <span className="hidden sm:inline-block">{t('language')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {locales.map((l) => (
                  <DropdownMenuItem 
                    key={l} 
                    onClick={() => handleLanguageChange(l)}
                    className={`flex items-center gap-2 ${locale === l ? "font-bold" : ""}`}
                  >
                    <Image 
                      src={flagImages[l as keyof typeof flagImages]} 
                      alt={l === 'es' ? 'Bandera española' : 'British flag'} 
                      width={20} 
                      height={15} 
                      className="rounded-sm"
                    />
                    {l === 'es' ? 'Español' : 'English'}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button 
              onClick={() => scrollToSection('contact')} 
              size="sm"
              aria-label="Agendar una llamada con nuestro equipo"
            >
              {t('schedule')}
            </Button>
          </div>

          {/* Botón de menú hamburguesa para móvil */}
          <button 
            onClick={() => menuOpen ? closeMenu() : openMenu()} 
            className="md:hidden ml-auto p-2 focus:outline-none" 
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Menú móvil */}
        {renderMenu && (
          <div 
            id="mobile-menu"
            className={`absolute top-14 left-0 w-full ${menuOpen ? "animate-slideDown" : "animate-slideUp"} md:hidden bg-background border-t border-border/40`}
            aria-hidden={!menuOpen}
          >
            <nav className="flex flex-col px-4 py-2 space-y-2 text-sm font-medium" aria-label="Navegación móvil">
              <Link 
                href="#solutions" 
                className="transition-colors hover:text-primary hover:bg-gray-200/10 rounded-md pl-4 py-3 text-left"
                onClick={(e) => handleLinkClick('solutions', e)}
                aria-label="Ver nuestras soluciones"
              >
                {t('solutions')}
              </Link>
              {/* <Link 
                href="#clients" 
                className="transition-colors hover:text-primary hover:bg-gray-200/10 rounded-md pl-4 py-3 text-left"
                onClick={(e) => handleLinkClick('clients', e)}
              >
                Clientes
              </Link> */}
              <Link 
                href="#about" 
                className="transition-colors hover:text-primary hover:bg-gray-200/50 rounded-md pl-4 py-2 text-left"
                onClick={(e) => handleLinkClick('about', e)}
                aria-label="Conocer más sobre nosotros"
              >
                {t('about')}
              </Link>
              <Button 
                onClick={() => { scrollToSection('contact'); closeMenu(); }} 
                variant="ghost" 
                size="sm"
                aria-label="Ir a la sección de contacto"
              >
                {t('contact')}
              </Button>
            
              <Button 
                onClick={() => { scrollToSection('calendar'); closeMenu(); }} 
                size="sm"
                aria-label="Agendar una llamada con nuestro equipo"
              >
                {t('schedule')}
              </Button>

              {/* Selector de idioma para móvil */}
              <div className="py-2 pt-5">
                {/* <p className="pl-4 mb-2 text-sm text-gray-400">{t('language')}</p> */}
                <div className="flex gap-2">
                  {locales.map((l) => (
                    <Button 
                      key={l} 
                      onClick={() => handleLanguageChange(l)} 
                      variant={locale === l ? "default" : "outline"}
                      size="sm"
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      <Image 
                        src={flagImages[l as keyof typeof flagImages]} 
                        alt={l === 'es' ? 'Bandera española' : 'British flag'} 
                        width={20} 
                        height={15} 
                        className="rounded-sm"
                      />
                      {l === 'es' ? 'Español' : 'English'}
                    </Button>
                  ))}
                </div>
              </div>
              
            </nav>
          </div>
        )}
      </header>
      <style jsx>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
        @keyframes slideUp {
          0% {
            opacity: 1;
            transform: translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out forwards;
        }
      `}</style>
    </>
  )
}

