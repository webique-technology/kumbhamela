import createMiddleware from 'next-intl/middleware';
import { routing } from '../src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match the root '/' and any path starting with your supported locales
  matcher: [
    '/',
    '/(de|en|hi|mr|sa|ta|ml|te|gu)/:path*',

    /*
     * Optional: If you have non-localized api routes or assets 
     * that were breaking, use this optimized exclusion pattern instead:
     */
    '/((?!api|_next/static|_next/image|favicon.ico|apple-icon.png|sitemap.xml|robots.txt).*)'
  ]
};