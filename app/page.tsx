import { redirect } from 'next/navigation';
import { defaultLocale } from '@/app/i18n';

// Redireccionar a la ruta con el locale por defecto
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}

