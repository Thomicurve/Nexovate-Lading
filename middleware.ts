import createMiddleware from 'next-intl/middleware';
import { routing } from './app/i18n';

export default createMiddleware({
  ...routing,
  localeCookie: { secure: process.env.NODE_ENV === 'production' },
});

export const config = {
  // Aplica el middleware a todas las rutas excepto a los archivos estáticos y API
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
