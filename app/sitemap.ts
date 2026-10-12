import type { MetadataRoute } from 'next';
import { homeUrls, languageAlternates } from '@/lib/seo';
import { locales } from '@/app/i18n';
import { serviceIds, servicePath, serviceAlternates } from '@/lib/services';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return [...homeUrls.map((url) => ({
    url,
    alternates: { languages: languageAlternates() },
  })), ...serviceIds.flatMap((id) => locales.map((locale) => ({
    url: absoluteUrl(servicePath(id, locale)),
    alternates: { languages: languageAlternates(serviceAlternates(id)) },
  })))];
}
