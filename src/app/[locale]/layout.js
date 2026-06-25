// src/app/[locale]/layout.js
import { Poppins, Playfair_Display, Montez, Sora } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getMessages } from 'next-intl/server';

import "../../styles/globals.css";
import "../../assets/scss/main.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { KumbhChatbot } from "@/components/ui/Chatbot";
import MarqueeSliderSec from "@/components/section/MarqueeSliderSec";

const sora = Sora({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-heading",
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const playfair_display = Playfair_Display({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montez = Montez({
  weight: '400',
  subsets: ['latin'],
  variable: "--font-montez",
});

export const metadata = {
  title: {
    default: "Mahakumbh Tours & Travels Nashik | Simhastha Kumbh Mela Nashik 2027",
    template: "%s | Mahakumbh Tours & Travels Nashik"
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  description: "Experience the divine with Mahakumbh Tours & Travels Nashik, your trusted car rental company in Nashik, Maharashtra. With 12 years of expertise, we specialize in Trimbakeshwar Joytirling Darshan, Nashik Darshan, Panchavti Tapovan, Shirdi Shani Shingnpur Darshan, and Grishneshwar Joytirling Darshan.",
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
    "Nashik Kumbh tour from Maharashtra",
    "Rental Vehicle services in Nashik",
    "Car rental in Nashik for Kumbh Mela",
    "Nashik to Shirdi taxi booking",
    "Nashik Trimbakeshwar taxi fare",
    "Nashik Darshan car with driver",
    "Shirdi Shani Shingnapur tour from Nashik",
    "Panchavti Tapovan tour Nashik",
    "Grishneshwar Jyotirlinga tour from Nashik"
  ],
  authors: [{ name: "Webique Technology", url: "https://webique.in" }],
  creator: "Webique Technology",
  publisher: "Mahakumbh Tours & Travels",
  metadataBase: new URL('https://nashikkumbhmela.in'), // Replace with your production domain
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/en',
      'mr-IN': '/mr', // For Marathi regional localized indexing if route applies
    },
  },
  openGraph: {
    title: "Mahakumbh Tours & Travels | Nashik Kumbh Mela 2027 Packages",
    description: "Experience the divine with Mahakumbh Tours & Travels Nashik, your trusted car rental company in Nashik, Maharashtra. With 12 years of expertise, we specialize in Trimbakeshwar Joytirling Darshan, Nashik Darshan, Panchavti Tapovan, Shirdi Shani Shingnpur Darshan, and Grishneshwar Joytirling Darshan.",
    url: 'https://mahakumbhtourstravelsnashik.com',
    siteName: 'Mahakumbh Tours & Travels Nashik',
    images: [
      {
        url: '/images/tour-section-bg.png', // Fallback social card graphic asset
        width: 1200,
        height: 630,
        alt: 'Mahakumbh Tours & Travels - Nashik Kumbh Mela 2027',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mahakumbh Tours & Travels | Nashik Kumbh Mela 2027",
    description: "Experience the divine with Mahakumbh Tours & Travels Nashik, your trusted car rental company in Nashik, Maharashtra. With 12 years of expertise, we specialize in Trimbakeshwar Joytirling Darshan, Nashik Darshan, Panchavti Tapovan, Shirdi Shani Shingnpur Darshan, and Grishneshwar Joytirling Darshan.",
    images: ['/images/tour-section-bg.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({ children, params }) {
  // 1. Explicitly await the incoming route params layout thread
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  // 2. Terminate invalid dynamic prefix routing requests safely
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  console.log("layout page local:", locale);

  // 3. Force fetch the targeted resource array matching the resolved locale key identifier
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${sora.variable} ${poppins.variable} ${montez.variable} ${playfair_display.variable}`}
      suppressHydrationWarning={true}
    >
      <body className="antialiased" suppressHydrationWarning={true}>
        {/* Pass down the locale and message configuration tokens to avoid desynchronization */}
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