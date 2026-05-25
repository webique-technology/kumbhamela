import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const withNextIntl = createNextIntlPlugin(
  "./src/i18n/request.js"
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.1.7"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.mahakumbhtourstravelsnashik.com",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },

  sassOptions: {
    includePaths: [path.join(__dirname, "src/assets/scss")],
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default withNextIntl(nextConfig);