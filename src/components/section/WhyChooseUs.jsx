"use client";
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { TitleComponent } from '../ui/common';
import "../../styles/whyChooseUs.scss"
const WhyChooseUs = () => {

    const whyChooseUsData = [
        {
            title: "The Holy Godavari",
            description: "A sacred river where Kumbh bathing is believed to cleanse sins and grant moksha.",
            icon: "/images/water.png"
        },
        {
            title: "Samudra Manthan",
            description: "Myth says drops of Amrit fell in Nashik, making it a holy Kumbh site.",
            icon: "/images/mountain.png"
        },
        {
            title: "Ramayana Connection",
            description: "Panchavati in Nashik is linked to Lord Rama’s exile in the Ramayana.",
            icon: "/images/historical.png"
        },
        {
            title: "Spiritual Significance",
            description: "Kumbh Mela in Nashik occurs every 12 years with strong spiritual importance.",
            icon: "/images/fire.png"
        }
    ]

    return (
        <>
            <section className="why-choose-us-section section-padding trinery-bg">
                <Container>
                    <Row>
                        <Col md={6}>
                            <TitleComponent
                                title="About Nashik Kumbh Mela"
                                // description="Stay Informed About Kumbh Mela"
                                className="mb-4 md-md-5"
                                divider={false}
                                montezSubTitle="Discover the Sacred"
                                montezClass="montez-sub-heading primery-color"
                                descClass='text-md'
                                description={"The Kumbh Mela is the world's largest peaceful gathering, a spiritual congregation that transcends time and brings together millions in pursuit of divine grace. Nashik holds a special place among the four sacred Kumbh sites."}
                            />
                            <Row className='g-4'>
                                {whyChooseUsData.map((item, index) => (
                                    <Col md={6} key={index}>
                                        <div className="why-choose-us-card d-flex align-items-start gap-2">
                                            <div className="icon">
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
                        <Col md={6} className='position-relative image-layout mt-4 mt-md-0'>
                            {/* Left Top Image */}
                            <div className="img-box img-1">
                                <img src="/images/about-sec-1.jpg" alt="group" />
                            </div>

                            {/* Right Main Image */}
                            <div className="img-box img-2">
                                <img src="/images/about-sec-2.jpg" alt="family" />
                            </div>

                            {/* Bottom Small Image */}
                            <div className="img-box img-3">
                                <img src="/images/wcu-img-3.jpg" alt="hiking" />
                            </div>
                        </Col>
                    </Row>

                </Container>
            </section>
        </>
    )
}

export default WhyChooseUs;