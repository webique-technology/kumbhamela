import React from 'react'
import { Globe, MessageCircle } from "lucide-react";
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
        <Link href="/tour-package" className="mobile-link" onClick={setIsMenuOpen}>{t('tourPackage')}</Link>
        <Link href="/blog" className="mobile-link" onClick={setIsMenuOpen}>{t('blog')}</Link>
        <Link href="/contact-us" className="mobile-link" onClick={setIsMenuOpen}>{t('contact')}</Link>

        <div className="mobile-actions p-3">
          <div className="mobile-lang-grid mb-3">
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
          </div>

          <a
            href="https://wa.me/919022093522"
            className="btn whatsapp-btn w-100 d-flex justify-content-center"
          >
            <MessageCircle size={18} />
            <span>WhatsApp</span>
          </a>
        </div>
      </nav>
    </div>
  )
}

export default NavSidebar;