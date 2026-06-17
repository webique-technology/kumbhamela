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
  title: "Mahakumbh Tours & Travels",
  description: "Official Spiritual Tourism Platform for Nashik Kumbh Mela",
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
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}