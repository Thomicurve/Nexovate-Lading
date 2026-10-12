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

export function homeStructuredData(locale: Locale, title: string, description: string) {
  const organizationId = absoluteUrl('/#organization');
  const websiteId = absoluteUrl('/#website');
  const url = localizedUrl(locale);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': organizationId,
        name: 'Nexovate', url: absoluteUrl('/'),
        logo: absoluteUrl('/images/brand/nexovate-logo.png'),
      },
      {
        '@type': 'WebSite', '@id': websiteId,
        name: 'Nexovate', url: absoluteUrl('/'), inLanguage: [...locales],
        publisher: { '@id': organizationId },
      },
      {
        '@type': 'WebPage', '@id': `${url}#webpage`,
        url, name: title, description, inLanguage: locale,
        isPartOf: { '@id': websiteId }, about: { '@id': organizationId },
      },
    ],
  };
}
