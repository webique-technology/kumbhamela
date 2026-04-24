"use client";

import React, { useState } from 'react';
import { Col, Container, Row, Tab, Nav } from 'react-bootstrap';
import Image from 'next/image';
import { TitleComponent } from '../ui/common';
import { planTabData } from '../../lib/data';
import { Plane, Hotel, UtilityPole, MapPin, PhoneCall, Car } from 'lucide-react'; // Example icons
import "../../styles/planTab.scss";

const PlanTabSec = () => {
    // Standard icons mapping (optional, or add to your data file)
    const icons = [Plane, Hotel, UtilityPole, MapPin, PhoneCall, Car];

    return (
        <section className='section-padding plan-tab-section'>
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
                                        <div className="h-100 rounded-4 overflow-hidden bg-white tab-grid-bg p-3">
                                            {tab.tabImages.map((value, num) => {
                                                return (
                                                    <div className='d-flex flex-column gap-3' key={num}>
                                                        <div className={`image-grid-layout-1 d-grid`}>
                                                            {value.top.map((img, index) => {
                                                                return (
                                                                    <div className={`grid-item top-grid-item-${index + 1}`} key={index}>
                                                                        {/* <img src={img} alt="" /> */}
                                                                        <Image
                                                                            src={img}
                                                                            alt=""
                                                                            width={200}
                                                                            height={200}
                                                                            className='object-fit-cover'
                                                                            priority
                                                                        />
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                        <div className={`image-grid-layout-2 d-grid`}>
                                                            {value.bottom.map((img, index) => {
                                                                return (
                                                                    <div className={`grid-item bottom-grid-item-${index + 1}`} key={index}>
                                                                        {/* <img src={img} alt="" /> */}
                                                                        <Image
                                                                            src={img}
                                                                            alt=""
                                                                            width={200}
                                                                            height={200}
                                                                            className='object-fit-cover'
                                                                            priority
                                                                        />
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                )
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
}

export default PlanTabSec;