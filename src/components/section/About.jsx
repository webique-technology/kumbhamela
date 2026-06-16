"use client";
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { TitleComponent } from '../ui/common';
import { useTranslations } from 'next-intl';
import "../../styles/whyChooseUs.scss"

const AboutSec = () => {
    const t = useTranslations('AboutSec');

    const aboutListData = [
        {
            title: t("item1_title"),
            description: t("item1_desc"),
            icon: "/images/water.png"
        },
        {
            title: t("item2_title"),
            description: t("item2_desc"),
            icon: "/images/mountain.png"
        },
        {
            title: t("item3_title"),
            description: t("item3_desc"),
            icon: "/images/historical.png"
        },
        {
            title: t("item4_title"),
            description: t("item4_desc"),
            icon: "/images/fire.png"
        }
    ];

    return (
        <>
            <section id="whyChooseUs" className="why-choose-us-section section-padding-2 position-relative">
                {/* <div className="bottom-divider position-absolute z-3 top-0"></div> */}
                <Container>
                    <Row>
                        <Col md={6}>
                            <TitleComponent
                                title={t("mainTitle")}
                                className="mb-4 md-md-5"
                                divider={false}
                                montezSubTitle={t("montezSubTitle")}
                                montezClass="playfair-display primery-color d-none d-md-block"
                                descClass='text-md'
                                description={t("mainDescription")}
                            />

                            <Row className='g-4'>
                                {aboutListData.map((item, index) => (
                                    <Col lg={6} key={index}>
                                        <div className="why-choose-us-card d-flex align-items-start gap-2">
                                            <div className="icon shadow-sm">
                                                <img src={item.icon} alt={item.title} />
                                            </div>
                                            <div className="content">
                                                <h3 className="title primery-color">{item.title}</h3>
                                                <p className="description">{item.description}</p>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        </Col>
                        <Col md={6} className='position-relative image-layout mt-4 mt-md-0 d-none d-md-block'>
                            {/* Left Top Image */}
                            <div className="img-box img-1">
                                <img src="/images/about-sec-1.jpg" alt="mahakumba - trambakeshwar" />
                            </div>

                            {/* Right Main Image */}
                            <div className="img-box img-2">
                                <img src="/images/ramkund-1.jpg" alt="mahakumbh - ramkund" />
                            </div>

                            {/* Bottom Small Image */}
                            <div className="img-box img-3">
                                <img src="/images/bath-2.jpg" alt="mahakumbh - naga sadhus" />
                            </div>
                        </Col>
                    </Row>

                </Container>
                <div className="top-divider trinery-bg position-absolute bottom-0"></div>
            </section>
        </>
    )
}

export default AboutSec;