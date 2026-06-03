import React from 'react'
import { Globe, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";

const NavSidebar = ({ languages, handleLanguageChange, setIsMenuOpen }) => {
  const t = useTranslations('Navbar');
  const locale = useLocale();

  return (
    <div className="container h-100">
      <nav className="mobile-nav">
        <Link href="/" className="mobile-link" onClick={setIsMenuOpen}>{t('home')}</Link>
        <Link href="/about-us" className="mobile-link" onClick={setIsMenuOpen}>{t('about')}</Link>
        <Link href="/hotel" className="mobile-link" onClick={setIsMenuOpen}>{t('hotel')}</Link>
        <Link href="/rental-car" className="mobile-link" onClick={setIsMenuOpen}>{t('rentalCar')}</Link>
        <Link href="/tour-package" className="mobile-link" onClick={setIsMenuOpen}>{t('tourPackage')}</Link>
        <Link href="/blog" className="mobile-link" onClick={setIsMenuOpen}>{t('blog')}</Link>
        <Link href="/contact-us" className="mobile-link" onClick={setIsMenuOpen}>{t('contact')}</Link>

        <div className="mobile-actions mt-4">
          {/* <div className="mobile-lang-grid mb-3">
            <p className="small fw-bold text-muted mb-2"><Globe size={14} /> Select Language</p>
            <div className="d-flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`btn btn-sm ${locale === lang.code ? 'btn-warning' : 'btn-outline-secondary'}`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div> */}

          <div>
            <h3 className="footer-heading">Contact Information</h3>

            <ul className="list-unstyled footer-contact">
              <li className="d-flex mb-3">
                <MapPin size={18} className="me-2 mt-1 icon" />
                <span className="text-dark">
                  Nashik Tourism Office <br />
                  Panchavati, Nashik 422003 <br />
                  Maharashtra, India
                </span>
              </li>

              <li className="d-flex mb-3">
                <Phone size={18} className="me-2 mt-1 icon" />
                <div>
                  <a href="tel:+911234567890" className="footer-link text-dark d-block">
                    +91 1234 567 890
                  </a>
                  <a href="tel:1800" className="footer-link text-dark d-block">
                    Toll Free: 1800-XXX-XXXX
                  </a>
                </div>
              </li>

              <li className="d-flex">
                <Mail size={18} className="me-2 mt-1 icon" />
                <a href="mailto:info@nashikkumbh.in" className="footer-link text-dark">
                  info@nashikkumbh.in
                </a>
              </li>
            </ul>
          </div>

          {/* <a
            href="https://wa.me/919022093522"
            className="btn whatsapp-btn w-100 d-flex justify-content-center"
          >
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </a> */}
        </div>
      </nav>
    </div>
  )
}

export default NavSidebar;