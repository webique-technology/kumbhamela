"use client";
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { TitleComponent } from '../ui/common';
import { useTranslations } from 'next-intl';
import "../../styles/whyChooseUs.scss"
import Image from 'next/image';

import historical from '../../assets/images/historical.png';
import fire from '../../assets/images/fire.png';
import water from '../../assets/images/water.png';
import mountain from '../../assets/images/mountain.png';

import aboutSec from '../../assets/images/about-sec-1.jpg';
import bath from '../../assets/images/bath-2.jpg';
import ramkund from '../../assets/images/ramkund-1.jpg';
import googleLogo from "../../assets/images/google-logo.png";
import tripAdvisorLogo from "../../assets/images/trip-advisor.png";
import Link from 'next/link';


const AboutSec = () => {
    const t = useTranslations('AboutSec');

    const aboutListData = [
        {
            title: t("item1_title"),
            description: t("item1_desc"),
            icon: water
        },
        {
            title: t("item2_title"),
            description: t("item2_desc"),
            icon: mountain
        },
        {
            title: t("item3_title"),
            description: t("item3_desc"),
            icon: historical
        },
        {
            title: t("item4_title"),
            description: t("item4_desc"),
            icon: fire
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
                                                <Image
                                                    src={item.icon}
                                                    alt={item.title}
                                                    width={40}
                                                    height={40}
                                                    style={{ objectFit: 'contain' }}
                                                />
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
                        <Col md={6} className='position-relative image-layout mt-4 mt-md-0 d-none d-md-flex align-items-end'>
                            {/* Left Top Image */}
                            <div className="img-box img-1">
                                <img src={aboutSec.src} alt="mahakumba - trambakeshwar" />
                            </div>

                            {/* Right Main Image */}
                            <div className="img-box img-2">
                                <img src={ramkund.src} alt="mahakumbh - ramkund" />
                            </div>

                            {/* Bottom Small Image */}
                            <div>
                                <div className="d-flex flex-wrap align-items-center gap-3 justify-content-center">
                                    {/* Apple App Store Button */}
                                    <Link
                                        href={"#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="d-inline-block transition-hover"
                                        style={{ height: "45px" }} // Explicit height forces matching scale
                                    >
                                        <img
                                            src={googleLogo.src} // Update this path to where your image is saved
                                            alt="Download on the App Store"
                                            className="w-auto h-100 object-fit-contain rounded-2"
                                            style={{ maxHeight: "45px" }}
                                        />
                                    </Link>
                                    {/* Google Play Store Button */}
                                    <Link
                                        href={"#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="d-inline-block transition-hover"
                                        style={{ height: "45px" }} // Identical explicit height
                                    >
                                        <img
                                            src={tripAdvisorLogo.src}// Update this path to where your image is saved
                                            alt="Get it on Google Play"
                                            className="w-auto h-100 object-fit-contain rounded-2"
                                            style={{ maxHeight: "45px" }}
                                        />
                                    </Link>
                                </div>
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