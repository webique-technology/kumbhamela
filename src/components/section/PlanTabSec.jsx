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
                    className="mb-1 text-center"
                    divider={false}
                    montezSubTitle="Discover the Sacred"
                    montezClass="playfair-display primery-color d-none d-md-block"
                />

                <Tab.Container id="left-tabs-example" defaultActiveKey="tab-0">
                    <Row className="mt-2 mt-md-4 g-4">
                        {/* LEFT SIDE: Navigation Buttons */}
                        <Col lg={6} className='tab-btn-count'>
                            <Nav variant="pills" className="flex-row flex-lg-column w-100 gap-2 gap-md-3 plan-nav-pills">
                                {planTabData.map((tab, i) => {
                                    const Icon = icons[i] || MapPin;
                                    return (
                                        <Nav.Item key={tab.id}>
                                            <Nav.Link eventKey={`tab-${i}`} className="plan-tab-item p-2 p-lg-4 shadow-sm">
                                                <div className='d-flex align-items-center gap-2 gap-md-3 gap-lg-4 text-start'>
                                                    <div className='icon-box text-white d-none d-md-block'>
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
                                        <div className="h-100 rounded-4 overflow-hidden bg-white d-flex flex-column gap-2 flex-column justify-content-between p-3">
                                            {tab.list.map((value, num) => (
                                                <React.Fragment key={`list-group-${num}`}>

                                                    <Row className='gap-2 gap-sm-0'>
                                                        {value.image && (
                                                            <Col sm={4} className='d-block d-sm-flex align-items-center justify-content-center'>
                                                                <div className='image-box'>
                                                                    <img src={value.image} className='w-100 h-100 object-fit-cover rounded-2' alt={value.title} />
                                                                </div>
                                                            </Col>
                                                        )}
                                                        <Col sm={value.image ? 8 : 12} className=''>
                                                            <div className='content-box'>
                                                                {/* <h4 className='m-0 fs-6'>{value.title}</h4> */}
                                                                <p className='m-0 small opacity-75'><span className='fw-bold text-dark fs-6'>{value.title} {value.title ? ": " : ""}</span>{value.description}</p>
                                                            </div>
                                                        </Col>
                                                    </Row>

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