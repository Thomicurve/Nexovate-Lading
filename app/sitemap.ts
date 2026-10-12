import type { MetadataRoute } from 'next';
import { homeUrls, languageAlternates } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return homeUrls.map((url) => ({
    url,
    alternates: { languages: languageAlternates() },
  }));
}
