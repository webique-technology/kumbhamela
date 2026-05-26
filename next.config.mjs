import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withNextIntl = createNextIntlPlugin(
  './src/i18n/request.js'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMAGE_PROTOCOL || 'https',
        hostname:
          process.env.NEXT_PUBLIC_IMAGE_HOSTNAME ||
          'api.mahakumbhtourstravelsnashik.com',
        port: process.env.NEXT_PUBLIC_IMAGE_PORT || '',
        pathname: '/uploads/**',
      },
    ],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, 'src/assets/scss')],
  },

  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default withNextIntl(nextConfig);