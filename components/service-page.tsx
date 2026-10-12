import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/app/i18n';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import StructuredData from '@/components/structured-data';
import { buttonVariants } from '@/components/ui/button';
import { serviceIds, servicePath, type ServiceId } from '@/lib/services';
import { serviceStructuredData } from '@/lib/seo';

export default async function ServicePage({ locale, serviceId }: { locale: Locale; serviceId: ServiceId }) {
  const t = await getTranslations({ locale });
  const name = t(`solutions.features.${serviceId}.title`);
  const description = t(`servicePages.services.${serviceId}.intro`);
  const sections = ['problem', 'solution', 'example', 'scope', 'preparation'] as const;
  return (
    <div className="relative min-h-screen">
      <StructuredData data={serviceStructuredData(serviceId, locale, t(`solutions.features.${serviceId}.seoTitle`), description, name, t('servicePages.home'))} />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="landing-container pb-16 pt-36 md:pt-44">
        <nav aria-label={t('servicePages.breadcrumb')} className="mb-8 text-sm text-muted-foreground">
          <ol className="flex flex-wrap gap-2">
            <li><a href={`/${locale}`} className="underline underline-offset-4">{t('servicePages.home')}</a></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{name}</li>
          </ol>
        </nav>
        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">{name}</h1>
        <p className="landing-copy mt-6 max-w-2xl">{description}</p>
        <div className="mt-12 max-w-3xl space-y-10">
          {sections.map((section) => (
            <section key={section} aria-labelledby={`service-${section}`}>
              <h2 id={`service-${section}`} className="text-2xl font-semibold tracking-tight md:text-3xl">{t(`servicePages.services.${serviceId}.${section}.heading`)}</h2>
              <p className="landing-copy mt-4">{t(`servicePages.services.${serviceId}.${section}.body`)}</p>
              {section === 'example' && <p className="mt-3 text-sm text-muted-foreground">{t('servicePages.exampleNote')}</p>}
            </section>
          ))}
        </div>
        <a href={`/${locale}#contact`} className={`${buttonVariants()} mt-10`}>{t('servicePages.contact')}</a>
        <section aria-labelledby="related-services" className="mt-16 border-t border-border pt-8">
          <h2 id="related-services" className="text-2xl font-semibold tracking-tight">{t('servicePages.related')}</h2>
          <ul className="mt-4 flex flex-col items-start gap-3">
            {serviceIds.filter((id) => id !== serviceId).map((id) => (
              <li key={id}><a href={servicePath(id, locale)} className="inline-flex min-h-12 items-center underline underline-offset-4">{t(`solutions.features.${id}.title`)}</a></li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
