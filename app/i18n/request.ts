import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './index';

export default getRequestConfig(async ({ locale }) => {
  // Verificar si el locale es válido, sino usar el por defecto
  const validLocale = locale && typeof locale === 'string' && locales.includes(locale as any) 
    ? locale 
    : defaultLocale;
  
  // Utilizando locale tal como viene de next-intl
  return {
    locale: validLocale,
    messages: (await import(`../../messages/${validLocale}/index.json`)).default
  };
}); 