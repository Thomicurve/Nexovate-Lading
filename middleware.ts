import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './app/i18n';

export default createMiddleware({
  // Lista de locales soportados
  locales,
  
  // Locale por defecto
  defaultLocale,
  
  // Si una solicitud no tiene un locale, redirigir al locale por defecto
  localePrefix: 'always',
  
  // Detectar el locale preferido del navegador o usar el default
  localeDetection: true
});

export const config = {
  // Aplica el middleware a todas las rutas excepto a los archivos estáticos y API
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}; 