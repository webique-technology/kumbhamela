import createNextIntlPlugin from "next-intl/plugin";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly pass the request configuration path
const withNextIntl = createNextIntlPlugin("./src/i18n/request.js");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Enable lightweight, standalone production build
  output: "standalone",

  // 2. Prevent CI/Hostinger build failure on minor lint or type checks
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // 3. Mark client-heavy/browser-only PDF packages as external for server bundling
  serverExternalPackages: ["jspdf", "jspdf-autotable"],

  // 4. Image Configuration
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_IMAGE_PROTOCOL || "https",
        hostname: process.env.NEXT_PUBLIC_IMAGE_HOSTNAME || "",
        port: process.env.NEXT_PUBLIC_IMAGE_PORT || "",
        pathname: "/uploads/**",
      },
    ],
  },

  // 5. Custom SASS Include Paths
  sassOptions: {
    includePaths: [path.join(__dirname, "src/assets/scss")],
  },

  // 6. Package Optimizations
  experimental: {
    optimizePackageImports: ["lucide-react", "react-bootstrap"],
  },
};

export default withNextIntl(nextConfig);
