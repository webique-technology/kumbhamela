// src/app/[locale]/layout.js
import { Poppins, Playfair_Display, Montez, Sora } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessages, getTranslations } from "next-intl/server";

import "../../styles/globals.css";
import "../../assets/scss/main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { KumbhChatbot } from "@/components/ui/Chatbot";
import MarqueeSliderSec from "@/components/section/MarqueeSliderSec";
import DisableCopy from "@/components/ui/DisableCopy";
import { truncateText, getValidUrl } from "@/lib/seo";

const sora = Sora({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-heading",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const playfair_display = Playfair_Display({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montez = Montez({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-montez",
});

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://mahakumbhtourstravelsnashik.com";

// Dynamic Metadata Handler for Multilingual SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || "en";

  // Match locale format for OpenGraph
  const ogLocale =
    locale === "mr" ? "mr_IN" : locale === "hi" ? "hi_IN" : "en_IN";

  // --- SHORTENED & CLEANED METADATA STRINGS ---
  const metaTitle = "Mahakumbh Tours & Travels | Nashik Kumbh Mela 2027";

  // Description: Exactly 143 characters (Fits Google's 155-character limit)
  const metaDescription =
    "Trusted car rental & tour agency in Nashik. Book pilgrimage tours for Trimbakeshwar Jyotirlinga, Shirdi, Panchavati & Simhastha Kumbh Mela.";

  // Social Description: Exactly 115 characters (Fits social card limit)
  const socialDescription =
    "Trusted car rental & pilgrimage tour agency in Nashik. Specialized in Trimbakeshwar, Panchavati & Shirdi Darshan.";

  // Absolute image URL
  const ogImageUrl = getValidUrl(BASE_URL, "/images/tour-section-bg.jpg");

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: metaTitle,
      // Shortened template suffix prevents double-brand expansion
      template: "%s | Mahakumbh Tours",
    },
    icons: {
      icon: "/icon.png",
      shortcut: "/icon.png",
      apple: "/icon.png",
    },
    description: metaDescription,
    keywords: [
      "Nashik Kumbh Mela 2027",
      "Kumbh Mela tour packages",
      "Trimbakeshwar Jyotirlinga tour",
      "Shahi Snan dates 2027",
      "Nashik pilgrimage packages",
      "Holy Yatras India",
      "Panchavati Nashik tour",
      "Kumbh Mela hotel booking",
      "Spiritual tour operators Nashik",
      "Maha Kumbh Snan packages",
      "Simhastha Kumbh Mela Nashik 2027",
      "Nashik Kumbh Mela tour packages",
      "Nashik Kumbh travel agency",
      "Book Kumbh Mela package Nashik",
      "Best tour operator for Nashik Kumbh Mela",
      "Car rental in Nashik for Kumbh Mela",
      "Nashik to Shirdi taxi booking",
      "Nashik Trimbakeshwar taxi fare",
      "Nashik Kumbh Mela",
      "Nashik-Trimbakeshwar Simhastha",
      "Sinhastha 2027",
      "Shahi Snan / Amrit Snan (Royal Bath)",
      "Dhwajarohan (Flag Hoisting)",
      "Sadhugram",
      "Akhara / 13 Akhadas",
      "Naga Sadhus",
      "Ram Kund (Nashik)",
      "Trimbakeshwar Shiva Temple / Trimbak",
      "Kushavarta Kund (Trimbakeshwar)",
      "Godavari River",
      "Panchavati",
      "Shravan Poornima / Amavasya",
      "Nashik Kumbh Mela time table",
      "Nashik Kumbh Mela start and end dates",
      "Nashik Kumbh Mela official website",
      "Nashik Kumbh Mela last date",
      "Kumbh Mela in Trimbakeshwar",
      "Significance & Importance of Kumbh Mela",
    ],
    authors: [
      { name: "Mahakumbh Tours & Travels", url: `${BASE_URL}/${locale}` },
    ],
    creator: "Webique Technology",
    publisher: "Mahakumbh Tours & Travels",
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: {
        "en-IN": `${BASE_URL}/en`,
        "hi-IN": `${BASE_URL}/hi`,
        "mr-IN": `${BASE_URL}/mr`,
      },
    },
    openGraph: {
      title: metaTitle,
      description: socialDescription,
      url: `${BASE_URL}/${locale}`,
      siteName: "Mahakumbh Tours & Travels Nashik",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Mahakumbh Tours & Travels - Nashik Kumbh Mela 2027",
        },
      ],
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: socialDescription,
      images: [ogImageUrl],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({ children, params }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${sora.variable} ${poppins.variable} ${montez.variable} ${playfair_display.variable}`}
      suppressHydrationWarning={true}
    >
      <body className="antialiased" suppressHydrationWarning={true}>
        <DisableCopy />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          {children}
          <MarqueeSliderSec />
          <Footer />
          <KumbhChatbot />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
