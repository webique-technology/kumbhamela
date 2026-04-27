import { Poppins, Inter, Montez, Sora } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import "../../styles/globals.css";
import "../../assets/scss/main.scss"
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

const sora2 = Sora({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ['400', '500', '600', '700', '800'],
});

const montez = Montez({
  weight: '400',
  subsets: ['latin'],
  variable: "--font-montez",
});

export const metadata = {
  title: "Nashik Kumbh Mela 2027",
  description: "Official Spiritual Tourism Platform for Nashik Kumbh Mela",
};

export default async function RootLayout({ children, params }) {
  // Await params as per Next.js 15+ requirements
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const messages = await getMessages(locale);

  return (
    <html lang={locale} className={`${sora.variable} ${poppins.variable} ${sora2.variable} ${montez.variable}`}>
      <body className="antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}