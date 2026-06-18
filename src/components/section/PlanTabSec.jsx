"use client";

import React, { useTransition } from 'react';
import { Col, Container, Row, Tab, Nav } from 'react-bootstrap';
import { TitleComponent } from '../ui/common';
import { useTranslations } from 'next-intl';
import { Plane, Hotel, UtilityPole, MapPin, PhoneCall, Car } from 'lucide-react';
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
import Image from 'next/image';

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
                    image: byAir,
                    titleKey: "tab0_item1_title",
                    descKey: "tab0_item1_desc"
                },
                {
                    image: byTrain,
                    titleKey: "tab0_item2_title",
                    descKey: "tab0_item2_desc"
                },
                {
                    image: byRoad,
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
                    image: citilincBus,
                    titleKey: "tab1_item1_title",
                    descKey: "tab1_item1_desc"
                },
                {
                    image: autoRickshaw,
                    titleKey: "tab1_item2_title",
                    descKey: "tab1_item2_desc"
                },
                {
                    image: walkingPath,
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
                    image: crowdSafety,
                    titleKey: "tab2_item1_title",
                    descKey: "tab2_item1_desc"
                },
                {
                    image: hydrationFood,
                    titleKey: "tab2_item2_title",
                    descKey: "tab2_item2_desc"
                },
                {
                    image: personalHygiene,
                    titleKey: "tab2_item3_title",
                    descKey: "tab2_item3_desc"
                },
                {
                    image: medicalServices,
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
                    image: null,
                    titleKey: "tab3_item1_title",
                    descKey: "tab3_item1_desc"
                },
                {
                    image: null,
                    titleKey: "tab3_item2_title",
                    descKey: "tab3_item2_desc"
                },
                {
                    image: null,
                    titleKey: "tab3_item3_title",
                    descKey: "tab3_item3_desc"
                },
                {
                    image: null,
                    titleKey: "tab3_item4_title",
                    descKey: "tab3_item4_desc"
                }
            ]
        }
    ];

    return (
        <section className={`section-padding trinery-bg plan-tab-section position-relative ${isPending ? "opacity-50" : ""}`}>
            <Container>
                <TitleComponent
                    title={t("mainTitle")}
                    className="mb-1 text-center"
                    divider={false}
                    montezSubTitle={t("montezSubTitle")}
                    montezClass="playfair-display primery-color d-none d-md-block"
                />

                {/* FIXED: eventKeys match configuration items cleanly */}
                <Tab.Container id="pilgrimage-plan-tabs" defaultActiveKey="tab-0">
                    <Row className="mt-2 mt-md-4 g-4">

                        {/* LEFT SIDE: Navigation Trigger Buttons */}
                        <Col lg={6} className='tab-btn-count'>
                            <Nav variant="pills" className="flex-row flex-lg-column w-100 gap-2 gap-md-3 plan-nav-pills">
                                {planTabsConfig.map((tab, i) => {
                                    const Icon = icons[i] || MapPin;
                                    return (
                                        <Nav.Item key={tab.id}>
                                            <Nav.Link eventKey={`tab-${i}`} className="plan-tab-item p-2 p-lg-4 shadow-sm">
                                                <div className='d-flex align-items-center gap-2 gap-md-3 gap-lg-4 text-start'>
                                                    <div className='icon-box text-white d-none d-md-block'>
                                                        <Icon size={18} />
                                                    </div>
                                                    <div className='content'>
                                                        <h3 className='m-0'>{t(tab.tabNameKey)}</h3>
                                                        <p className='m-0 small opacity-75 d-none d-lg-block'>
                                                            {t(tab.tabDescKey)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Nav.Link>
                                        </Nav.Item>
                                    );
                                })}
                            </Nav>
                        </Col>

                        {/* RIGHT SIDE: Dynamic Panel Layout Content Streams */}
                        <Col lg={6}>
                            <Tab.Content className="ps-lg-5 h-100">
                                {planTabsConfig.map((tab, i) => (
                                    <Tab.Pane eventKey={`tab-${i}`} key={tab.id} className="h-100">
                                        <div className="h-100 rounded-4 overflow-hidden bg-white d-flex flex-column gap-3 justify-content-between p-3 shadow-sm">
                                            {tab.list.map((value, num) => {
                                                const hasTitle = t(value.titleKey) !== "";

                                                return (
                                                    <React.Fragment key={`list-group-${num}`}>
                                                        <Row className='gap-2 gap-sm-0 align-items-center py-2 border-bottom border-light-subtle last-border-0'>
                                                            {value.image && (
                                                                <Col sm={4} className='d-block d-sm-flex align-items-center justify-content-center'>
                                                                    <div className='image-box overflow-hidden rounded-2' style={{ width: '100%', height: '95px' }}>
                                                                        <Image
                                                                            src={value.image}
                                                                            alt={t(value.titleKey) || "Plan Image"}
                                                                            sizes="100%"
                                                                            width={145}
                                                                            height={120}
                                                                            className='img-fluid'
                                                                            style={{ objectFit: 'cover' }}
                                                                            placeholder="blur"
                                                                        />
                                                                        <img src={value.image} className='img-fluid' alt="" />
                                                                    </div>
                                                                </Col>
                                                            )}
                                                            <Col sm={value.image ? 8 : 12}>
                                                                <div className='content-box'>
                                                                    <p className='m-0 small opacity-75 text-secondary lh-base'>
                                                                        {hasTitle && (
                                                                            <span className='fw-bold text-dark fs-6 d-block mb-1'>
                                                                                {t(value.titleKey)}
                                                                            </span>
                                                                        )}
                                                                        {t(value.descKey)}
                                                                    </p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </React.Fragment>
                                                );
                                            })}
                                        </div>
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        </Col>

                    </Row>
                </Tab.Container>
            </Container>
        </section>
    );
};

export default PlanTabSec;