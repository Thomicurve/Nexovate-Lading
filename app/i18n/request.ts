import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from './index';

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale = locales.includes(requestedLocale as Locale)
    ? requestedLocale as Locale
    : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}/index.json`)).default
  };
});
