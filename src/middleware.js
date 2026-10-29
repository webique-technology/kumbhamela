import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(en|hi|mr|sa|ta|ml|te|gu)/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|apple-icon.png|sitemap.xml|robots.txt).*)'
  ]
};