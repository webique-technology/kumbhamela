"use client";

import React, { useState } from 'react';
import { Col, Container, Row, Tab, Nav } from 'react-bootstrap';
import Image from 'next/image';
import { TitleComponent } from '../ui/common';
import { planTabData } from '../../lib/data';
import { Plane, Hotel, UtilityPole, MapPin, PhoneCall, Car, CircleCheck, TriangleAlert } from 'lucide-react'; // Example icons
import "../../styles/planTab.scss";

const PlanTabSec = () => {
    // Standard icons mapping (optional, or add to your data file)
    const icons = [Plane, Hotel, UtilityPole, MapPin, PhoneCall, Car];

    return (
        <section className='section-padding trinery-bg plan-tab-section position-relative'>
            {/* <div className="top-divider position-absolute top-0"></div> */}
            <Container>
                <TitleComponent
                    title="Plan your Pilgrimage"
                    className="mb-5 text-center"
                    divider={false}
                    montezSubTitle="Discover the Sacred"
                    montezClass="montez-sub-heading primery-color"
                />

                <Tab.Container id="left-tabs-example" defaultActiveKey="tab-0">
                    <Row className="mt-5 g-4">
                        {/* LEFT SIDE: Navigation Buttons */}
                        <Col lg={6} className='tab-btn-count'>
                            <Nav variant="pills" className="flex-row flex-lg-column w-100 gap-2 gap-md-3 plan-nav-pills">
                                {planTabData.map((tab, i) => {
                                    const Icon = icons[i] || MapPin;
                                    return (
                                        <Nav.Item key={tab.id}>
                                            <Nav.Link eventKey={`tab-${i}`} className="plan-tab-item p-2 p-lg-4">
                                                <div className='d-flex align-items-center gap-2 gap-md-3 gap-lg-4 text-start'>
                                                    <div className='icon-box text-white'>
                                                        <Icon size={18} />
                                                    </div>
                                                    <div className='content'>
                                                        <h3 className='m-0'>{tab.tabName}</h3>
                                                        <p className='m-0 small opacity-75 d-none d-lg-block'>{tab.tabDesc}</p>
                                                    </div>
                                                </div>
                                            </Nav.Link>
                                        </Nav.Item>
                                    );
                                })}
                            </Nav>
                        </Col>

                        {/* RIGHT SIDE: Dynamic Images */}
                        <Col lg={6}>
                            <Tab.Content className="ps-lg-5 h-100">
                                {planTabData.map((tab, i) => (
                                    <Tab.Pane eventKey={`tab-${i}`} key={tab.id} className="h-100">
                                        <div className="h-100 rounded-4 overflow-hidden bg-white d-flex flex-column flex-md-row flex-lg-column justify-content-between justify-content-lg-start p-3">
                                            {tab.list.map((value, num) => (
                                                <React.Fragment key={`list-group-${num}`}>

                                                    {/* Top List Logic */}
                                                    {value.top?.some(item => item !== "") && (
                                                        <div>
                                                            <h4>{tab.tabName === "Do's & Don'ts" ? "Do's" : tab.tabName}</h4>
                                                            <ul className="d-flex flex-column gap-3 mb-4 list-unstyled">
                                                                {value.top.filter(item => item !== "").map((item, itd) => (
                                                                    <li key={`top-${itd}`} className="d-flex align-items-start justify-content-start gap-2">
                                                                        <span className="text-success">
                                                                            <CircleCheck size={18} />
                                                                        </span>
                                                                        <p className="m-0 text-muted">{item}</p>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Bottom List Logic (Conditional Icons) */}
                                                    {value.bottom?.some(item => item !== "") && (
                                                        <div>
                                                            <h4>{tab.tabName === "Do's & Don'ts" ? "Don'ts " : ""}</h4>
                                                            <ul className="d-flex flex-column gap-3 list-unstyled">
                                                                {value.bottom.filter(item => item !== "").map((item, idb) => (
                                                                    <li key={`bottom-${idb}`} className="d-flex align-items-start justify-content-start gap-2">
                                                                        {/* Conditional Icon based on Tab Name */}
                                                                        {tab.tabName === "Do's & Don'ts" ? (
                                                                            <span className="text-danger">
                                                                                <TriangleAlert size={18} />
                                                                            </span>
                                                                        ) : (
                                                                            <span className="text-success">
                                                                                <CircleCheck size={18} />
                                                                            </span>
                                                                        )}
                                                                        <p className="m-0 text-muted">{item}</p>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </Tab.Pane>
                                ))}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
            {/* <div className="bottom-divider position-absolute bottom-0"></div> */}
        </section>
    );
}

export default PlanTabSec;