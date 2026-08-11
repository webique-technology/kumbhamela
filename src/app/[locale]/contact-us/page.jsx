import ContactUsPage from "./ContactPage";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return buildPageMetadata({
    locale,
    pageSlug: "contact-us",
    title: "Contact Us",
    description:
      "Get 24/7 support & booking help for Nashik Kumbh Mela 2027 - 28 - 28, Trimbakeshwar Jyotirlinga, and Shirdi tours.",
    keywords: [
      "Connect With Our Pilgrimage Experts",
      "Kumbh Mela 2027 - 28 - 28 booking support",
      "Nashik tour packages contact",
      "Jyotirlinga Yatra booking number",
      "Tempo traveller hire Nashik contact",
      "Mahakumbh Mela customer service",
      "Trimbakeshwar pilgrimage booking",
      "Shirdi tour booking helpdesk",
      "24/7 travel assistance Kumbh Mela",
      "Emergency travel support Nashik",
      "Travel agency in Nashik",
    ],
  });
}

const ContactUs = () => {
  return <ContactUsPage />;
};

export default ContactUs;
