import React from 'react'
import { Globe, MessageCircle, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import logo from "../../assets/images/logo-2.png"


const NavSidebar = ({ languages, handleLanguageChange, setIsMenuOpen }) => {
  const t = useTranslations('Navbar');
  const locale = useLocale();

  return (
    <div className="container h-100 trinery-bg">
      <nav className="mobile-nav py-4">
        <Link href="/" className="d-flex mb-3 align-items-center text-decoration-none logo">
          {/* <div className="logo-icon"><span className="text-white">ॐ</span></div> */}
          <img src={logo.src} alt="Logo" width={50} height={50} className="me-2"/>
          <div className="logo-text">
            <h1>{t("logoTitle")}</h1>
            <p className='lh-auto'>{t("logoSubtitle")}</p>
          </div>
        </Link>
        <Link href="/" className="mobile-link" onClick={setIsMenuOpen}>{t('home')}</Link>
        <Link href="/about-us" className="mobile-link" onClick={setIsMenuOpen}>{t('about')}</Link>
        <Link href="/hotel" className="mobile-link" onClick={setIsMenuOpen}>{t('hotel')}</Link>
        <Link href="/rental-car" className="mobile-link" onClick={setIsMenuOpen}>{t('rentalCar')}</Link>
        <Link href="/tour-package" className="mobile-link" onClick={setIsMenuOpen}>{t('tourPackage')}</Link>
        <Link href="/blog" className="mobile-link" onClick={setIsMenuOpen}>{t('blog')}</Link>
        <Link href="/contact-us" className="mobile-link" onClick={setIsMenuOpen}>{t('contact')}</Link>

        <div className="mobile-actions mt-4">
          <div>
            <h3 className="footer-heading poppins">{t("contactInformation")}</h3>

            <ul className="list-unstyled footer-contact">
              <li className="d-flex mb-3">
                <MapPin size={18} className="me-2 mt-1 icon" />
                <span className="text-dark poppins small-base">
                  Nashik Tourism Office <br />
                  Panchavati, Nashik 422003 <br />
                  Maharashtra, India
                </span>
              </li>

              <li className="d-flex mb-3 poppins">
                <Phone size={18} className="me-2 mt-1 icon" />
                <div>
                  <a href="tel:+917507778070" className="footer-link text-decoration-none small-base text-dark d-block">
                    +91 7507778070
                  </a>
                </div>
              </li>

              <li className="d-flex poppins">
                {/* <Mail size={24} className="me-2 mt-1 icon" /> */}
                <div className='d-flex flex-column'>
                  <a href="mailto:kumbhtourstravels@gmail.com" className="footer-link text-decoration-none small-base text-dark">
                    kumbhtourstravels@gmail.com
                  </a>
                  <a href="mailto:mahakumbhtourstravels@gmail.com" className="footer-link text-decoration-none small-base text-dark">
                    mahakumbhtourstravels@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* <a
            href="https://wa.me/917507778088"
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