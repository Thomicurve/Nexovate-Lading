import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import type { Locale } from '@/app/i18n';

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  // Obtener los mensajes del locale actual
  try {
    const messages = await getMessages({ locale });

    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    );
  } catch (error) {
    console.error(`Error cargando mensajes para locale: ${locale}`, error);
    // Fallar silenciosamente y mostrar contenido sin internacionalización
    return <>{children}</>;
  }
} 