// src/components/layout/Navbar.jsx
"use client";

import { useState, useEffect, useTransition } from "react";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import "../../styles/navbar.scss";
import NavSidebar from "./Sidebar";

import logo from "../../assets/images/logo.png"

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);

    // React 19 transition thread manager
    const [isPending, startTransition] = useTransition();

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
            setIsMenuOpen(true);
            setTimeout(() => {
                setShowSidebar(true);
            }, 250);
        } else {
            closeMenu();
        }
    };

    const closeMenu = () => {
        setShowSidebar(false);
        setIsMenuOpen(false);
    };

    const handleLanguageChange = (newLocale) => {
        if (newLocale === locale) {
            setIsLangOpen(false);
            return;
        }

        // Wrap execution in a transition pass to clear route history layers
        startTransition(() => {
            router.replace(pathname, { locale: newLocale });
        });

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
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [showSidebar]);

    return (
        <header className={`custom-navbar ${scrolled ? "scrolled" : ""} ${isPending ? "switching-locale" : ""}`}>
            <div className="container">
                <div className="d-flex align-items-center justify-content-between navbar-inner">

                    {/* Logo Section */}
                    <Link href="/" className="d-flex align-items-center text-decoration-none logo" onClick={closeMenu}>
                        {/* <div className="logo-icon"><span className="text-white">ॐ</span></div> */}
                        <img src={logo.src} alt="Logo" width={50} height={50} className="me-2"/>
                        <div className="logo-text">
                            <h1>{t("logoTitle")}</h1>
                            <p>{t("logoSubtitle")}</p>
                        </div>
                    </Link>

                    {/* Navigation Stream Container Block */}
                    <nav className="d-none d-lg-flex sora align-items-center gap-4 nav-links">
                        <Link href="/" className={`nav-link-custom ${pathname === "/" ? "active" : ""}`}>
                            {t("home")}
                        </Link>
                        <Link href="/about-us" className={`nav-link-custom ${pathname === "/about-us" ? "active" : ""}`}>
                            {t("about")}
                        </Link>
                        <Link href="/hotel" className={`nav-link-custom ${pathname === "/hotel" ? "active" : ""}`}>
                            {t("hotel")}
                        </Link>
                        <Link href="/rental-car" className={`nav-link-custom ${pathname === "/rental-car" ? "active" : ""}`}>
                            {t("rentalCar")}
                        </Link>
                        <Link href="/tour-package" className={`nav-link-custom ${pathname === "/tour-package" ? "active" : ""}`}>
                            {t("tourPackage")}
                        </Link>
                        <Link href="/blog" className={`nav-link-custom ${pathname === "/blog" ? "active" : ""}`}>
                            {t("blog")}
                        </Link>
                        <Link href="/contact-us" className={`nav-link-custom ${pathname === "/contact-us" ? "active" : ""}`}>
                            {t("contact")}
                        </Link>
                    </nav>

                    {/* Actions Panel Wrapper */}
                    <div className="d-flex align-items-center gap-2 right-actions">
                        <div className="position-relative">
                            <button
                                className="lang-btn d-flex align-items-center gap-1"
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                disabled={isPending}
                                style={{ opacity: isPending ? 0.6 : 1 }}
                            >
                                <Globe size={18} />
                                <span className="text-uppercase">{locale}</span>
                                <ChevronDown size={14} className={isLangOpen ? "rotate-180" : ""} />
                            </button>

                            {isLangOpen && (
                                <div className="lang-dropdown shadow-lg">
                                    {languages.map((lang) => (
                                        <div
                                            key={lang.code}
                                            className={`lang-item ${locale === lang.code ? 'active' : ''}`}
                                            onClick={() => handleLanguageChange(lang.code)}
                                        >
                                            {lang.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button className="mobile-toggle d-lg-none" onClick={toggleMenu}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                </div>
            </div>

            <div className={`nav-overlay ${isMenuOpen ? "active" : ""}`} onClick={closeMenu}></div>

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