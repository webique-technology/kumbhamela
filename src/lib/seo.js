// src/lib/seo.js

const PRIMARY_DOMAIN = "https://mahakumbhtourstravelsnashik.com";

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
  pageSlug,
  title,
  description,
  keywords = [],
  ogImage = "/images/tour-section-bg.jpg",
  supportLocales = ["en", "hi", "mr", "gu", "ta", "te", "ml", "sa"],
  // Explicitly update default fallback here:
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || PRIMARY_DOMAIN,
}) {
  const shortTitle = truncateText(title, 35);
  const metaTitle = `${shortTitle} | Mahakumbh Tours`;
  const socialTitle = `${shortTitle} | Nashik Kumbh 2027`;

  const searchDescription = truncateText(description, 155);
  const socialDescription = truncateText(description, 120);

  // Force image to route through the real domain
  const ogImageUrl = getValidUrl(baseUrl, ogImage);

  const rootOrigin = getValidUrl(baseUrl, "");
  const cleanSlug = pageSlug.replace(/^\/+/, "");
  const canonicalUrl = `${rootOrigin}/${locale}/${cleanSlug}`;

  const languageAlternates = {};
  supportLocales.forEach((loc) => {
    const regionKey = loc === "en" ? "en-IN" : `${loc}-IN`;
    languageAlternates[regionKey] = `${rootOrigin}/${loc}/${cleanSlug}`;
  });

  return {
    metadataBase: new URL(rootOrigin),
    title: metaTitle,
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
          url: ogImageUrl, // Now outputs: https://mahakumbhtourstravelsnashik.com/images/tour-section-bg.jpg
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
