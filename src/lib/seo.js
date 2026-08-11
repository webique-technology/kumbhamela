// src/lib/seo.js

/**
 * Cleanly truncates text at the nearest word boundary without breaking words.
 */
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
 * Constructs a valid absolute URL, ensuring clean slash formatting.
 */
export function getValidUrl(base, relativePath) {
  const cleanBase = (base || "https://mahakumbhtours.com").replace(/\/+$/, "");
  const cleanPath = relativePath.startsWith("/")
    ? relativePath
    : `/${relativePath}`;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Standardized metadata builder for Next.js pages.
 */
export function buildPageMetadata({
  locale,
  pageSlug,
  title,
  description,
  keywords = [],
  ogImage = "/images/tour-section-bg.jpg",
  supportLocales = ["en", "hi", "mr", "gu", "ta", "te", "ml", "sa"],
  baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://mahakumbhtours.com",
}) {
  const shortTitle = truncateText(title, 60);
  const metaTitle = `${shortTitle} | Mahakumbh Tours`;
  const socialTitle = `${shortTitle} | Nashik Kumbh 2027 - 28`;

  const searchDescription = truncateText(description, 155);
  const socialDescription = truncateText(description, 120);

  const canonicalUrl = getValidUrl(baseUrl, `/${locale}/${pageSlug}`);
  const ogImageUrl = getValidUrl(baseUrl, ogImage);

  const languageAlternates = {};
  supportLocales.forEach((loc) => {
    const regionKey = loc === "en" ? "en-IN" : `${loc}-IN`;
    languageAlternates[regionKey] = getValidUrl(baseUrl, `/${loc}/${pageSlug}`);
  });

  return {
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
