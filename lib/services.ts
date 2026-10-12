import { locales, type Locale } from '@/app/i18n';

const serviceSlugs = {
  customSoftware: { es: 'software-a-medida', en: 'custom-software' },
  automation: { es: 'automatizacion-de-procesos', en: 'process-automation' },
  traceability: { es: 'trazabilidad', en: 'traceability' },
  dataIntegration: { es: 'integracion-de-sistemas', en: 'system-integration' },
} as const;

export type ServiceId = keyof typeof serviceSlugs;
export const serviceIds = Object.keys(serviceSlugs) as ServiceId[];
const families: Record<Locale, string> = { es: 'servicios', en: 'services' };

export function servicePathname(id: ServiceId, locale: Locale): string {
  return `/${families[locale]}/${serviceSlugs[id][locale]}`;
}

export function servicePath(id: ServiceId, locale: Locale): string {
  return `/${locale}${servicePathname(id, locale)}`;
}

export function serviceAlternates(id: ServiceId): Record<Locale, string> {
  return { es: servicePathname(id, 'es'), en: servicePathname(id, 'en') };
}

export function resolveService(locale: string, family: string, slug: string): ServiceId | undefined {
  if (!locales.includes(locale as Locale) || families[locale as Locale] !== family) return;
  return serviceIds.find((id) => serviceSlugs[id][locale as Locale] === slug);
}

export function translatedPathname(pathname: string, language: Locale): string {
  const [, locale, family, slug, ...rest] = pathname.split('/');
  const service = rest.length === 0 ? resolveService(locale, family, slug) : undefined;
  return service ? servicePath(service, language) : `/${language}${pathname.replace(/^\/[^/]+/, '')}`;
}

export function homeSectionHref(locale: Locale, pathname: string, section: string): string {
  return pathname.replace(/\/$/, '') === `/${locale}` ? `#${section}` : `/${locale}#${section}`;
}
