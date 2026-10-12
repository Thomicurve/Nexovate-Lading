import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/app/i18n';
import ServicePage from '@/components/service-page';
import { resolveService } from '@/lib/services';
import { serviceMetadata } from '@/lib/seo';

type Params = { locale: Locale; section: string; slug: string };

function selectedService(params: Params) {
  const id = resolveService(params.locale, params.section, params.slug);
  if (!id) notFound();
  return id;
}

export async function generateMetadata({ params }: { params: Params }) {
  const id = selectedService(params);
  const t = await getTranslations({ locale: params.locale });
  return serviceMetadata(id, params.locale, t(`solutions.features.${id}.seoTitle`),
    t(`servicePages.services.${id}.intro`), t('metadata.imageAlt'));
}

export default function Page({ params }: { params: Params }) {
  return <ServicePage locale={params.locale} serviceId={selectedService(params)} />;
}
