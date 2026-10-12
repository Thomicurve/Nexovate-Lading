import { defaultLocale, locales, type Locale } from '@/app/i18n';

export const siteOrigin = 'https://www.nexovate.com.ar';

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, `${siteOrigin}/`).toString();
}

export function localizedUrl(locale: Locale, pathname = '/'): string {
  const path = pathname === '/' ? '' : `/${pathname.replace(/^\/+|\/+$/g, '')}`;
  return absoluteUrl(`/${locale}${path}`);
}

export function languageAlternates(
  pathnames: Record<Locale, string> = { es: '/', en: '/' },
): Record<Locale | 'x-default', string> {
  return {
    es: localizedUrl('es', pathnames.es),
    en: localizedUrl('en', pathnames.en),
    'x-default': localizedUrl(defaultLocale, pathnames[defaultLocale]),
  };
}

export const homeUrls = locales.map((locale) => localizedUrl(locale));
