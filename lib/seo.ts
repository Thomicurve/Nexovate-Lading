import { defaultLocale, locales, type Locale } from '@/app/i18n';
import type { Metadata } from 'next';
import { serviceAlternates, servicePathname, type ServiceId } from '@/lib/services';

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

export function serviceMetadata(id: ServiceId, locale: Locale, title: string, description: string, imageAlt: string): Metadata {
  const url = localizedUrl(locale, servicePathname(id, locale));
  return {
    title, description,
    alternates: { canonical: url, languages: languageAlternates(serviceAlternates(id)) },
    openGraph: {
      type: 'website', url, title, description, siteName: 'Nexovate',
      locale: locale === 'es' ? 'es_AR' : 'en_GB',
      alternateLocale: locale === 'es' ? 'en_GB' : 'es_AR',
      images: [{ url: '/images/brand/nexovate-logo.png', width: 2172, height: 724, type: 'image/png', alt: imageAlt }],
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/images/brand/nexovate-logo.png'] },
  };
}

export function serviceStructuredData(id: ServiceId, locale: Locale, title: string, description: string, name: string, homeLabel: string) {
  const url = localizedUrl(locale, servicePathname(id, locale));
  const identity = homeStructuredData(locale, title, description)['@graph'].slice(0, 2);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      ...identity,
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: title, description, inLanguage: locale,
        isPartOf: { '@id': absoluteUrl('/#website') }, about: { '@id': `${url}#service` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'Service', '@id': `${url}#service`, url, name, description,
        provider: { '@id': absoluteUrl('/#organization') },
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: homeLabel, item: localizedUrl(locale) },
          { '@type': 'ListItem', position: 2, name, item: url },
        ],
      },
    ],
  };
}
