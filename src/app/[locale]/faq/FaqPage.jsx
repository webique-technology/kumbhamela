"use client";

import React, { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import {
  Container,
  Row,
  Col,
  Accordion,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import "../../../styles/FaqPage.scss";
import "../../../assets/scss/main.scss";
import { HeroHeaderCard2 } from "@/components/ui/card";
const CATEGORIES = [
  { id: "all", labelKey: "categories.all", fallback: "All Questions" },
  { id: "kumbh", labelKey: "categories.kumbh", fallback: "Kumbh Mela 2027–28" },
  {
    id: "transport",
    labelKey: "categories.transport",
    fallback: "Car Rentals & Transfers",
  },
  {
    id: "packages",
    labelKey: "categories.packages",
    fallback: "Packages & Stays",
  },
  {
    id: "booking",
    labelKey: "categories.booking",
    fallback: "Pricing & Support",
  },
];

export default function FaqPage() {
  const t = useTranslations("FaqPage");

  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeKey, setActiveKey] = useState("0");

  // Pull translated FAQ array safely from messages/<locale>.json
  const rawItems = t.has("items") ? t.raw("items") : [];
  const faqList = Array.isArray(rawItems) ? rawItems : [];

  const filteredFaqs = useMemo(() => {
    return faqList.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [faqList, activeCategory, searchQuery]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setActiveKey("0");
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("all");
    setActiveKey("0");
  };

  return (
    <main className="faq-page-wrapper">
      {/* Hero & Search Banner */}
      <section className="faq-hero-section text-center text-white p-0">
        <Container>
          <Row className="justify-content-center">
            <Col lg={9} xl={8}>
              {/* <span className="faq-hero-badge d-inline-block mb-3">
                {t.has("eyebrow") ? t("eyebrow") : "Pilgrim Help Center"}
              </span>
              <h1 className="faq-hero-title mb-3">
                {t.has("title") ? t("title") : "Frequently Asked Questions"}
              </h1>
              <p className="faq-hero-subtitle mx-auto mb-4">
                {t.has("subtitle")
                  ? t("subtitle")
                  : "Everything you need to know about Simhastha Kumbh Mela 2027–28, Nashik–Trimbakeshwar darshan, car rentals, and customized pilgrimage tours."}
              </p> */}
              <HeroHeaderCard2
                subTitle={t("eyebrow")}
                heroTitle={t("title")}
                description={t("subtitle")}
                showSearch={false}
                heroTitleClass={"text-light"}
              />
              {/* Search Bar */}
              {/* <div className="faq-search-box mx-auto">
                <InputGroup size="lg">
                  <Form.Control
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setActiveKey("0");
                    }}
                    placeholder={
                      t.has("searchPlaceholder")
                        ? t("searchPlaceholder")
                        : "Search questions (e.g., Shahi Snan, Innova, Mumbai Airport, Hotel)..."
                    }
                    aria-label="Search Frequently Asked Questions"
                    className="faq-search-input"
                  />
                  {searchQuery && (
                    <Button
                      variant="light"
                      onClick={() => setSearchQuery("")}
                      aria-label="Clear search"
                      className="faq-search-clear-btn"
                    >
                      ✕
                    </Button>
                  )}
                </InputGroup>
              </div> */}
            </Col>
          </Row>
        </Container>
      </section>

      {/* Main FAQ Content Section */}
      <section className="faq-content-section section-padding">
        <Container>
          <Row className="justify-content-center">
            <Col lg={10} xl={9}>
              {/* Section Heading matching reference design */}
              

              {/* Category Filter Pills */}
              <div className="faq-category-bar d-flex flex-wrap gap-2 mb-4">
                {CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <Button
                      key={cat.id}
                      type="button"
                      variant="light"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`faq-category-pill ${isActive ? "active" : ""}`}
                    >
                      {t.has(cat.labelKey) ? t(cat.labelKey) : cat.fallback}
                    </Button>
                  );
                })}
              </div>

              {/* Outer White Container Card (Matches Screenshot) */}
              {filteredFaqs.length === 0 ? (
                <div className="faq-empty-state text-center p-5">
                  <h3 className="faq-empty-title mb-2">
                    {t.has("noResultsTitle")
                      ? t("noResultsTitle")
                      : "No matching questions found"}
                  </h3>
                  <p className="faq-empty-desc mb-4">
                    {t.has("noResultsDesc")
                      ? t("noResultsDesc")
                      : "Try clearing your search filter or ask our Nashik travel desk directly."}
                  </p>
                  <Button
                    type="button"
                    onClick={handleResetFilters}
                    className="faq-reset-btn"
                  >
                    {t.has("resetButton") ? t("resetButton") : "Reset Filters"}
                  </Button>
                </div>
              ) : (
                <div className="faq-shell-card">
                  <Accordion
                    activeKey={activeKey}
                    onSelect={(eventKey) => setActiveKey(eventKey ?? null)}
                    className="faq-custom-accordion"
                  >
                    {filteredFaqs.map((faq, index) => {
                      const eventKey = String(index);
                      const isOpen = activeKey === eventKey;

                      return (
                        <Accordion.Item
                          key={faq.id || index}
                          eventKey={eventKey}
                          className={`faq-accordion-item ${isOpen ? "is-open" : ""}`}
                        >
                          <Accordion.Header className="faq-accordion-header">
                            <span className="faq-question-text">
                              {faq.question}
                            </span>
                            <span
                              className="faq-chevron-icon"
                              aria-hidden="true"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="6 9 12 15 18 9" />
                              </svg>
                            </span>
                          </Accordion.Header>
                          <Accordion.Body className="faq-accordion-body">
                            <p className="mb-0">{faq.answer}</p>
                          </Accordion.Body>
                        </Accordion.Item>
                      );
                    })}
                  </Accordion>
                </div>
              )}

              {/* Bottom Support CTA Card */}
              {/* <div className="faq-cta-card mt-5">
                <Row className="align-items-center g-4">
                  <Col md={7} className="text-center text-md-start">
                    <h2 className="faq-cta-title mb-2">
                      {t.has("cta.title")
                        ? t("cta.title")
                        : "Still Have Questions About Your Pilgrimage?"}
                    </h2>
                    <p className="faq-cta-subtitle mb-0">
                      {t.has("cta.subtitle")
                        ? t("cta.subtitle")
                        : "Speak directly with our Nashik travel experts for custom Kumbh Mela itineraries, group Tempo Travellers, and verified hotel availability."}
                    </p>
                  </Col>
                  <Col md={5}>
                    <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-3">
                      <a
                        href="https://wa.me/917507778088?text=Hello%20Mahakumbh%20Tours%20%26%20Travels%2C%20I%20have%20a%20question%20about%20my%20Nashik%20pilgrimage."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn faq-btn-whatsapp"
                      >
                        {t.has("cta.whatsapp") ? t("cta.whatsapp") : "WhatsApp Us"}
                      </a>
                      <a
                        href="tel:+917507778088"
                        className="btn faq-btn-call"
                      >
                        {t.has("cta.call")
                          ? t("cta.call")
                          : "Call +91 7507778088"}
                      </a>
                    </div>
                  </Col>
                </Row>
              </div> */}
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}
