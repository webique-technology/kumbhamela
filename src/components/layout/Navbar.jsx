"use client";

import { useState, useEffect } from "react";
import { Menu, X, Globe, MessageCircle, ChevronDown } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import "../../styles/navbar.scss";
import NavSidebar from "./Sidebar";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Controls the Overlay
    const [showSidebar, setShowSidebar] = useState(false); // Controls the Sidebar
    const [scrolled, setScrolled] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);

    const t = useTranslations('Navbar');
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();

    const languages = [
        { code: 'en', label: 'English' },
        { code: 'hi', label: 'Hindi' },
        { code: 'mr', label: 'Marathi' },
        { code: 'sa', label: 'Sanskrit' },
        { code: 'ta', label: 'Tamil' },
        { code: 'te', label: 'Telugu' },
        { code: 'ml', label: 'Malayalam' },
        { code: 'gu', label: 'Gujarati' },
    ];

    const toggleMenu = () => {
        if (!isMenuOpen) {
            // 1. Start Overlay Animation First
            setIsMenuOpen(true);

            // 2. Wait exactly 2.5 seconds before showing Sidebar
            setTimeout(() => {
                setShowSidebar(true);
            }, 250);
        } else {
            closeMenu();
        }
    };

    const closeMenu = () => {
        // Reset everything immediately on close
        setShowSidebar(false);
        setIsMenuOpen(false);
    };

    const handleLanguageChange = (newLocale) => {
        router.replace(pathname, { locale: newLocale });
        setIsLangOpen(false);
        closeMenu();
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (showSidebar) {
            // Prevent scrolling
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = '0px'; // Prevents "jumping" if scrollbar disappears
        } else {
            // Restore scrolling
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        }

        // Cleanup when component unmounts
        return () => {
            document.body.style.overflow = 'unset';
            document.body.style.paddingRight = '0px';
        };
    }, [showSidebar]);

    return (
        <header className={`custom-navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="container">
                <div className="d-flex align-items-center justify-content-between navbar-inner">
                    {/* Logo */}
                    <Link href="/" className="d-flex align-items-center text-decoration-none logo">
                        <div className="logo-icon"><span className="text-white">ॐ</span></div>
                        <div className="logo-text">
                            <h1>Nashik Kumbh</h1>
                            <p>Mela 2027</p>
                        </div>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="d-none d-lg-flex align-items-center nav-links">
                        <Link href="/" className="nav-link-custom">{t('home')}</Link>
                        <Link href="/about-us" className="nav-link-custom">{t('about')}</Link>
                        <Link href="/hotel" className="nav-link-custom">{t('hotel')}</Link>
                        <Link href="/rental-car" className="nav-link-custom">{t('rentalCar')}</Link>
                        <Link href="/tour-package" className="nav-link-custom">{t('tourPackage')}</Link>
                        <Link href="/blog" className="nav-link-custom">{t('blog')}</Link>
                        <Link href="/contact-us" className="nav-link-custom">{t('contact')}</Link>
                    </nav>

                    {/* Right Side Actions */}
                    <div className="d-none d-lg-flex align-items-center gap-3 right-actions">
                        <div className="position-relative">
                            <button className="lang-btn d-flex align-items-center gap-1" onClick={() => setIsLangOpen(!isLangOpen)}>
                                <Globe size={18} />
                                <span className="text-uppercase">{locale}</span>
                                <ChevronDown size={14} className={isLangOpen ? "rotate-180" : ""} />
                            </button>
                            {isLangOpen && (
                                <div className="lang-dropdown shadow-lg">
                                    {languages.map((lang) => (
                                        <div key={lang.code} className={`lang-item ${locale === lang.code ? 'active' : ''}`} onClick={() => handleLanguageChange(lang.code)}>
                                            {lang.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {/* <a href="https://wa.me/919022093522" target="_blank" className="btn whatsapp-btn d-flex align-items-center">
                            <MessageCircle size={18} />
                            <span>WhatsApp</span>
                        </a> */}
                    </div>

                    {/* Mobile Toggle */}
                    <button className="mobile-toggle d-lg-none" onClick={toggleMenu}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Background Overlay - Triggered by isMenuOpen */}
            <div
                className={`nav-overlay ${isMenuOpen ? "active" : ""}`}
                onClick={closeMenu}
            ></div>

            {/* Mobile Sidebar - Triggered by showSidebar (2.5s later) */}
            <div className={`mobile-menu d-lg-none ${showSidebar ? "open" : ""}`}>
                <NavSidebar
                    languages={languages}
                    handleLanguageChange={handleLanguageChange}
                    setIsMenuOpen={closeMenu}
                />
            </div>
        </header>
    );
}
export default Navbar;