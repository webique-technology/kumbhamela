"use client";

import React, { useTransition } from 'react';
import { Col, Container, Row, Tab, Nav, Accordion } from 'react-bootstrap';
import { TitleComponent } from '../ui/common';
import { useTranslations } from 'next-intl';
import {
    Plane,
    Hotel,
    UtilityPole,
    MapPin,
    PhoneCall,
    Car,
    TrainFront,
    Bus,
    BusFront,
    CarFront,
    Footprints,
    UsersRound,
    UtensilsCrossed,
    ShieldCheck,
    Activity,
    ShieldAlert,
    Ambulance,
    Info,
    Headphones
} from 'lucide-react';
import "../../styles/planTab.scss";



import byAir from "../../assets/images/by-air.webp";
import byTrain from "../../assets/images/by-train.webp";
import byRoad from "../../assets/images/by-road.webp";
import citilincBus from "../../assets/images/citilinc-bus.webp";
import autoRickshaw from "../../assets/images/auto-rickshaw.webp";
import walkingPath from "../../assets/images/walking-path.webp";
import crowdSafety from "../../assets/images/crowd-safety.webp";
import hydrationFood from "../../assets/images/hydration-food.webp";
import personalHygiene from "../../assets/images/personal-hygiene.webp";
import medicalServices from "../../assets/images/medical-services.webp";
import planImg from "../../assets/images/plantab.webp";
import googleLogo from "../../assets/images/google-logo.png";
import tripAdvisorLogo from "../../assets/images/trip-advisor.png";
import Image from 'next/image';
import Link from 'next/link';


const PlanTabSec = () => {
    // 1. Correct namespace binding initialized
    const t = useTranslations('PlanTab');
    const [isPending] = useTransition();

    // 2. Lucide component map configuration alignment 
    const icons = [Plane, Hotel, UtilityPole, MapPin, PhoneCall, Car];

    // Local configuration data containing translation key references
    const planTabsConfig = [
        {
            id: "plan-reach",
            tabNameKey: "tab0_name",
            tabDescKey: "tab0_desc",
            list: [
                {
                    icon: <Plane />,
                    titleKey: "tab0_item1_title",
                    descKey: "tab0_item1_desc"
                },
                {
                    icon: <TrainFront />,
                    titleKey: "tab0_item2_title",
                    descKey: "tab0_item2_desc"
                },
                {
                    icon: <Bus />,
                    titleKey: "tab0_item3_title",
                    descKey: "tab0_item3_desc"
                }
            ]
        },
        {
            id: "plan-transport",
            tabNameKey: "tab1_name",
            tabDescKey: "tab1_desc",
            list: [
                {
                    icon: <BusFront />,
                    titleKey: "tab1_item1_title",
                    descKey: "tab1_item1_desc"
                },
                {
                    icon: <CarFront />,
                    titleKey: "tab1_item2_title",
                    descKey: "tab1_item2_desc"
                },
                {
                    icon: <Footprints />,
                    titleKey: "tab1_item3_title",
                    descKey: "tab1_item3_desc"
                }
            ]
        },
        {
            id: "plan-safety",
            tabNameKey: "tab2_name",
            tabDescKey: "tab2_desc",
            list: [
                {
                    icon: <UsersRound />,
                    titleKey: "tab2_item1_title",
                    descKey: "tab2_item1_desc"
                },
                {
                    icon: <UtensilsCrossed />,
                    titleKey: "tab2_item2_title",
                    descKey: "tab2_item2_desc"
                },
                {
                    icon: <ShieldCheck />,
                    titleKey: "tab2_item3_title",
                    descKey: "tab2_item3_desc"
                },
                {
                    icon: <Activity />,
                    titleKey: "tab2_item4_title",
                    descKey: "tab2_item4_desc"
                }
            ]
        },
        {
            id: "plan-helpline",
            tabNameKey: "tab3_name",
            tabDescKey: "tab3_desc",
            list: [
                {
                    icon: <ShieldAlert />,
                    titleKey: "tab3_item1_title",
                    descKey: "tab3_item1_desc"
                },
                {
                    icon: <Ambulance />,
                    titleKey: "tab3_item2_title",
                    descKey: "tab3_item2_desc"
                },
                {
                    icon: <Info />,
                    titleKey: "tab3_item3_title",
                    descKey: "tab3_item3_desc"
                },
                {
                    icon: <Headphones />,
                    titleKey: "tab3_item4_title",
                    descKey: "tab3_item4_desc"
                }
            ]
        }
    ];

    return (
        <section className={`section-padding trinery-bg plan-tab-section position-relative ${isPending ? "opacity-50" : ""}`}>
            <Container>


                {/* FIXED: eventKeys match configuration items cleanly */}
                <Tab.Container id="pilgrimage-plan-tabs" defaultActiveKey="tab-0">
                    <Row className="mt-2 mt-md-4 g-4 justify-content-between">

                        {/* RIGHT SIDE: Dynamic Panel Layout Content Streams */}
                        <Col lg={5} className='d-none d-md-flex'>
                            <div className='position-relative'>
                                <img src={planImg.src} alt="" className='image-box' />
                                {/* <div className="app-btn-box d-flex flex-column flex-wrap align-items-center gap-3 justify-content-center">
                                    <Link
                                        href={"#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="play-style-btn p-2 d-flex gap-2 align-items-center flex-row transition-hover"
                                    >
                                        <img
                                            src={googleLogo.src} // Update this path to where your image is saved
                                            alt="Download on the App Store"
                                            className="w-auto h-100 object-fit-contain rounded-2"
                                            style={{ maxHeight: "45px" }}
                                        />
                                    </Link>
                                    <Link
                                        href={"#"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="play-style-btn p-2 d-flex gap-2 align-items-center flex-row transition-hover"
                                    >
                                        <img
                                            src={tripAdvisorLogo.src}// Update this path to where your image is saved
                                            alt="Get it on Google Play"
                                            className="w-auto h-100 object-fit-contain rounded-2"
                                            style={{ maxHeight: "45px" }}
                                        />
                                    </Link>
                                </div> */}
                            </div>
                        </Col>

                        {/* LEFT SIDE: Navigation Trigger Buttons */}
                        <Col lg={7} className='tab-btn-count'>
                            <TitleComponent
                                title={t("mainTitle")}
                                className="mb-3 text-center text-md-start"
                                divider={false}
                                montezSubTitle={t("montezSubTitle")}
                                montezClass="playfair-display primery-color"
                            />
                            <Accordion defaultActiveKey="1" className=''>
                                {planTabsConfig.map((tab, i) => {
                                    const Icon = icons[i] || MapPin;
                                    return (
                                        <div key={i}>
                                            <Accordion.Item eventKey={i.toString()} className='mb-3'>
                                                <Accordion.Header className='fw-bold'>{t(tab.tabNameKey)}</Accordion.Header>
                                                <Accordion.Body className='p-2'>
                                                    {/* {t(tab.tabDescKey)} */}
                                                    <div>
                                                        {tab.list.map((value, num) => {
                                                            const hasTitle = t(value.titleKey) !== "";
                                                            return (
                                                                <div className='p-2 h-100' key={num}>
                                                                    <div className='content-box d-flex gap-2'>
                                                                        <span className='flex-shrink-0 border icon-box'>{value.icon}</span>
                                                                        <p className='m-0 small opacity-75 text-secondary lh-base'>
                                                                            {hasTitle && (
                                                                                <span className='fw-semibold text-dark fs-6 d-block mb-1'>
                                                                                    {t(value.titleKey)}
                                                                                </span>
                                                                            )}
                                                                            {t(value.descKey)}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </div>
                                    );
                                })}
                            </Accordion>
                        </Col>

                    </Row>
                </Tab.Container>
            </Container>
        </section >
    );
};

export default PlanTabSec;