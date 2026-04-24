"use client";
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { SwiperSliderComp, TitleComponent } from '../ui/common'
import { sacredDestinations } from '../../lib/data'
import { SwiperSlide } from 'swiper/react'
import Image from 'next/image'
import { PrimeryBtn } from '../ui/button'
import { ArrowRight, ArrowLeft } from "lucide-react";


const TouristVisitSection = () => {
    return (
        <section className='section-padding sacred-destinations'>
            <Container>
                <div className="d-flex mb-4 position-relative justify-content-between align-items-center">
                    <div>
                        <TitleComponent
                            title="Sacred Destinations"
                            // description="Stay Informed About Kumbh Mela"
                            className="mb-4 md-md-5"
                            divider={false}
                            montezSubTitle="Must-Visit Temples & Holy Sites"
                            montezClass="montez-sub-heading primery-color"
                        />
                    </div>
                    {/* Custom Navigation Buttons */}
                    <div className="me-0">
                        <div className="slider-nav-wrapper d-flex gap-2 me-0 me-lg-1">
                            <button className="destination-prev-btn slider-prev-btn nav-custom-btn">
                                <ArrowLeft size={20} />
                            </button>
                            <button className="destination-next-btn slider-next-btn nav-custom-btn">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
                {/* grid cards */}
                {/* <Row className='g-4'>
                    {sacredDestinations.map((value, index) => (
                        <Col key={index} lg={4} md={6} sm={12} xs={12}>
                            <SacredDestinationsCard
                                destination={value}
                            />
                        </Col>
                    ))}
                </Row> */}

                {/* slider */}
                <SwiperSliderComp
                    slidesPerView={4}
                    navigation={false}
                    spaceBetween={20}
                    timeDelay={4000}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        450: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 40,
                        },
                    }}
                    navigation={{
                        prevEl: '.destination-prev-btn',
                        nextEl: '.destination-next-btn',
                    }}
                >
                    {sacredDestinations.map((value, index) => (
                        <SwiperSlide key={index}>
                            <div className='card-image-wrapper rounded-4 overflow-hidden'>
                                <Image
                                    src={value.image}
                                    alt={value.name}
                                    width={200}
                                    height={600}
                                    className="card-img-top object-fit-cover"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                                <div className="sd-body">
                                    <h4 className='text-light mb-1'>{value.name}</h4>
                                    <p className='text-white m-0'>{value.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </SwiperSliderComp>

                <PrimeryBtn
                    className="primery-btn mt-4"
                    title="View All"
                    btnLink="/tourist-visit"
                    iconRight={<ArrowRight size={16} />}
                />
            </Container>
        </section>
    )
}

export default TouristVisitSection