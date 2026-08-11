// src/lib/seo.js

const PRIMARY_DOMAIN = "https://mahakumbhtourstravelsnashik.com";

// Helper to cleanly truncate strings at word boundaries
export function truncateText(text, maxLength = 155) {
  if (!text) return "";
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;

  const lastSpace = trimmed.lastIndexOf(" ", maxLength);
  return (
    (lastSpace > 0
      ? trimmed.slice(0, lastSpace)
      : trimmed.slice(0, maxLength)) + "..."
  );
}

/**
 * Constructs guaranteed absolute URLs anchored to the correct domain.
 */
export function getValidUrl(base, relativePath) {
  const envBase = process.env.NEXT_PUBLIC_BASE_URL || PRIMARY_DOMAIN;

  let cleanOrigin;
  try {
    cleanOrigin = new URL(base || envBase).origin;
  } catch {
    cleanOrigin = PRIMARY_DOMAIN;
  }

  const cleanPath = relativePath.startsWith("/")
    ? relativePath
    : `/${relativePath}`;
  return `${cleanOrigin}${cleanPath}`;
}

export function buildPageMetadata({
  locale,
  pageSlug = "",
  title,
  description,
  keywords = [],
  ogImage = "/images/tour-section-bg.jpg",
  supportLocales = ["en", "hi", "mr", "gu", "ta", "te", "ml", "sa"],
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || PRIMARY_DOMAIN,
}) {
  // 1. Truncate base title to 35 chars -> Total ~53 chars with suffix (Safely under 60 char limit)
  const shortTitle = truncateText(title, 35);
  const metaTitle = `${shortTitle} | Mahakumbh Tours`;
  const socialTitle = `${shortTitle} | Nashik Kumbh 2027`;

  // 2. Truncate descriptions for Search & Social
  const searchDescription = truncateText(description, 155);
  const socialDescription = truncateText(description, 120);

  // 3. Absolute Image & Path URLs
  const ogImageUrl = getValidUrl(baseUrl, ogImage);
  const rootOrigin = getValidUrl(baseUrl, "");

  // Formats slug cleanly (handles empty slug, leading slashes)
  const cleanSlug = pageSlug.replace(/^\/+/, "");
  const pathSuffix = cleanSlug ? `/${cleanSlug}` : "";

  const canonicalUrl = `${rootOrigin}/${locale}${pathSuffix}`;

  // 4. Language Alternates (en-IN, hi-IN, mr-IN, etc.)
  const languageAlternates = {};
  supportLocales.forEach((loc) => {
    const regionKey = loc === "en" ? "en-IN" : `${loc}-IN`;
    languageAlternates[regionKey] = `${rootOrigin}/${loc}${pathSuffix}`;
  });

  return {
    metadataBase: new URL(rootOrigin),

    // Explicit title object prevents root layout template duplication
    title: {
      absolute: metaTitle,
    },

    description: searchDescription,
    keywords,

    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },

    openGraph: {
      title: socialTitle,
      description: socialDescription,
      type: "website",
      locale: locale === "en" ? "en_IN" : `${locale}_IN`,
      url: canonicalUrl,
      siteName: "Mahakumbh Tours & Travels",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [ogImageUrl],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
