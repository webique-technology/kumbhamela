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

  // 2. Image Configuration
  images: {
    // Note: If unoptimized is true, Remote Patterns aren't strictly required,
    // but they serve as a safe fallback if unoptimized is ever toggled.
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

  // 3. Custom SASS Include Paths
  sassOptions: {
    includePaths: [path.join(__dirname, "src/assets/scss")],
  },

  // 4. Package Optimizations
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default withNextIntl(nextConfig);
