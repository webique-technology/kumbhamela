"use client";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { CommonPopup, TitleComponent } from "../ui/common";
import { useTranslations } from "next-intl";
import "../../styles/whyChooseUs.scss";
import Image from "next/image";
import historical from "../../assets/images/historical.png";
import fire from "../../assets/images/fire.png";
import water from "../../assets/images/water.png";
import mountain from "../../assets/images/mountain.png";

import aboutSec from "../../assets/images/about-sec-1.jpg";
import ramkund from "../../assets/images/ramkund-1.jpg";

const AboutSec = () => {
  const t = useTranslations("AboutSec");
  const tr = useTranslations("Common");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenPopup = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const aboutListData = [
    {
      title: t("item1_title"),
      description: t("item1_desc"),
      icon: water,
      history: t.has("item1_history") ? t("item1_history") : "",
      route: t.has("item1_route") ? t("item1_route") : "",
      transport: t.has("item1_transport") ? t("item1_transport") : "",
      // routeLink: "/contact",
    },
    {
      title: t("item2_title"),
      description: t("item2_desc"),
      icon: mountain,
      history: t.has("item2_history") ? t("item2_history") : "",
      route: t.has("item2_route") ? t("item2_route") : "",
      transport: t.has("item2_transport") ? t("item2_transport") : "",
      // routeLink: "/contact",
    },
    {
      title: t("item3_title"),
      description: t("item3_desc"),
      icon: historical,
      history: t.has("item3_history") ? t("item3_history") : "",
      route: t.has("item3_route") ? t("item3_route") : "",
      transport: t.has("item3_transport") ? t("item3_transport") : "",
      // routeLink: "/contact",
    },
    {
      title: t("item4_title"),
      description: t("item4_desc"),
      icon: fire,
      history: t.has("item4_history") ? t("item4_history") : "",
      route: t.has("item4_route") ? t("item4_route") : "",
      transport: t.has("item4_transport") ? t("item4_transport") : "",
      // routeLink: "/contact",
    },
  ];

  return (
    <>
      <section
        id="whyChooseUs"
        className="why-choose-us-section section-padding-2 position-relative"
      >
        <Container>
          <Row>
            <Col md={6}>
              <TitleComponent
                title={t("mainTitle")}
                className="mb-4 md-md-5"
                divider={false}
                montezSubTitle={t("montezSubTitle")}
                montezClass="playfair-display primery-color d-none d-md-block"
                descClass="text-md"
                description={t("mainDescription")}
              />

              <Row className="g-4">
                {aboutListData.map((item, index) => (
                  <Col lg={6} key={index}>
                    <div className="why-choose-us-card d-flex align-items-start gap-2">
                      <div className="icon shadow-sm">
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={40}
                          height={40}
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <div className="content">
                        <h3 className="title primery-color">{item.title}</h3>
                        <p className="description">{item.description}</p>
                        <button
                          className="bg-transparent p-0 border-0 border-none d-inline description"
                          onClick={() => handleOpenPopup(item)}
                        >
                          <span className="primery-color small-12">
                            {tr("ReadMore")} <span>&rarr;</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>

            <Col
              md={6}
              className="position-relative image-layout mt-4 mt-md-0 d-none d-md-flex align-items-end"
            >
              <div className="img-box img-1">
                <img src={aboutSec.src} alt="mahakumbh - trambakeshwar" />
              </div>

              <div className="img-box img-2">
                <img src={ramkund.src} alt="mahakumbh - ramkund" />
              </div>
            </Col>
          </Row>

          <CommonPopup
            data={selectedItem}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </Container>
        <div className="top-divider trinery-bg position-absolute bottom-0"></div>
      </section>
    </>
  );
};

export default AboutSec;
