"use client";

import React, { useTransition } from 'react';
import { Col, Container, Row, Tab, Nav } from 'react-bootstrap';
import { TitleComponent } from '../ui/common';
import { useTranslations } from 'next-intl';
import { Plane, Hotel, UtilityPole, MapPin, PhoneCall, Car } from 'lucide-react';
import "../../styles/planTab.scss";

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
                    image: "/images/by-air.webp",
                    titleKey: "tab0_item1_title",
                    descKey: "tab0_item1_desc"
                },
                {
                    image: "/images/by-train.webp",
                    titleKey: "tab0_item2_title",
                    descKey: "tab0_item2_desc"
                },
                {
                    image: "/images/by-road.webp",
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
                    image: "/images/citilinc-bus.webp",
                    titleKey: "tab1_item1_title",
                    descKey: "tab1_item1_desc"
                },
                {
                    image: "/images/auto-rickshaw.webp",
                    titleKey: "tab1_item2_title",
                    descKey: "tab1_item2_desc"
                },
                {
                    image: "/images/walking-path.webp",
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
                    image: "/images/crowd-safety.webp",
                    titleKey: "tab2_item1_title",
                    descKey: "tab2_item1_desc"
                },
                {
                    image: "/images/hydration-food.webp",
                    titleKey: "tab2_item2_title",
                    descKey: "tab2_item2_desc"
                },
                {
                    image: "/images/personal-hygiene.webp",
                    titleKey: "tab2_item3_title",
                    descKey: "tab2_item3_desc"
                },
                {
                    image: "/images/medical-services.webp",
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
                    image: "",
                    titleKey: "tab3_item1_title",
                    descKey: "tab3_item1_desc"
                },
                {
                    image: "",
                    titleKey: "tab3_item2_title",
                    descKey: "tab3_item2_desc"
                },
                {
                    image: "",
                    titleKey: "tab3_item3_title",
                    descKey: "tab3_item3_desc"
                },
                {
                    image: "",
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
                                                                        <img
                                                                            src={value.image}
                                                                            className='w-100 h-100 object-fit-cover'
                                                                            alt={t(value.titleKey)}
                                                                        />
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