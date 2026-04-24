"use client";
import React from 'react'
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Star, MapPin, MessageCircle, Users, ChevronRight } from "lucide-react";
import Link from "next/link"; // Add this import
import { useParams } from 'next/navigation';
import { WhatsappBtn } from './button';
import { SwiperSliderComp } from './common';
import { SwiperSlide } from 'swiper/react';
import { Col, Container, Row } from 'react-bootstrap';
import IconResolver from './iconResolver';

// for blogs card
export const BlogCard = ({ blog, blogLink, img_width, img_height, img_count_width = "100%", img_count_height = "220px" }) => {
    return (
        <div className="card h-100 border-0 blog-card shadow-sm">

            {/* Image */}
            <div
                className="blog-img-count position-relative overflow-hidden"
                style={{
                    width: img_count_width,
                    maxHeight: img_count_height
                }}
            >
                {/* <img
                    src={blog.image}
                    alt={blog.title}
                    className="blog-img"
                /> */}
                <Image
                    src={blog.image}
                    alt={blog.blogTitle}
                    width={img_width}
                    height={img_height}
                    className="blog-img card-img-top"
                />

                {/* Category */}
                <span className="badge blog-badge position-absolute d-flex align-items-center justify-content-center top-0 start-0 m-3">
                    {blog.category}
                </span>
            </div>

            {/* Content */}
            <div className="card-body py-4 px-1">

                {/* Meta */}
                <div className="d-flex gap-3 text-muted small mb-2">
                    <div className="d-flex align-items-center gap-1">
                        <Calendar size={14} />
                        <span>{blog.date}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1">
                        <Clock size={14} />
                        <span>{blog.readTime}</span>
                    </div>
                </div>

                {/* Title */}
                <Link href={blogLink} className="text-decoration-none">
                    <h3 className="card-title mb-3 fw-semibold text-dark blog-title">
                        {blog.blogTitle}
                    </h3>
                </Link>

                {/* Excerpt */}
                <p className="card-text text-muted small blog-excerpt">
                    {blog.description}
                </p>

                {/* Button */}
                <Link href={blogLink} className="btn btn-link p-0 blog-readmore text-decoration-none d-flex align-items-center gap-1">
                    Read More <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    )
}

// for hotels card
export const HotelCards = ({ hotel, onBookNow }) => {
    return (
        <>
            <div className="card h-100 border-0 shadow-sm hotel-card overflow-hidden">

                {/* Image Header */}
                <div className="position-relative hotel-img-container">
                    <SwiperSliderComp
                        navigation={false}
                        loop={true}
                        timeDelay={3000}
                    >
                        {hotel.images.map((value, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={value}
                                    alt={hotel.name}
                                    width={400}
                                    height={250}
                                    className="card-img-top object-fit-cover"
                                    style={{ width: '100%', height: 'auto' }}
                                    priority
                                />
                            </SwiperSlide>
                        ))}
                    </SwiperSliderComp>
                    {/* <Image
                        src={hotel.images}
                        alt={hotel.name}
                        width={400}
                        height={250}
                        className="card-img-top object-fit-cover"
                    /> */}

                    {/* Badge Left */}
                    <div className="position-absolute top-0 start-0 m-3 z-2">
                        <span className="badge badge-left rounded-pill bg-brand-orange">
                            {hotel.type}
                        </span>
                    </div>

                    {/* Rating Right */}
                    <div className="position-absolute top-0 end-0 m-3 badge rounded-pill bg-white text-dark d-flex align-items-center gap-1 shadow-sm">
                        <Star size={14} className="text-warning fill-warning" />
                        <span className="fw-bold text-dark">{hotel.rating}</span>
                    </div>
                </div>

                {/* Card Body */}
                <div className="card-body p-4">
                    <h3 className="h5 fw-bold text-brand-dark mb-2">{hotel.name}</h3>

                    <div className="d-flex align-items-center gap-2 text-muted small mb-3">
                        <MapPin size={16} className="text-brand-orange" />
                        <span>{hotel.location}</span>
                    </div>

                    {/* Features */}
                    <div className="d-flex flex-wrap gap-2 mb-4">
                        {hotel.features.map((feature, idx) => (
                            <span
                                key={idx}
                                className="badge d-flex align-items-center justify-content-center rounded-pill border border-light"
                            >
                                {feature}
                            </span>
                        ))}
                    </div>

                    {/* Footer Logic */}
                    <div className="d-flex align-items-center justify-content-between pt-3 border-top mt-auto">
                        <div>
                            <small className="text-muted d-block">Starting from</small>
                            <span className="h4 text-brand-orange mb-0">{hotel.price}</span>
                            <small className="text-muted d-block smaller">per night</small>
                        </div>

                        {/* whatsapp btn */}
                        <WhatsappBtn
                            type='button'
                            onClick={onBookNow}
                            iconLeft={<MessageCircle size={18} />}
                            title="Book Now"
                            className="btn btn-whatsapp d-flex align-items-center gap-2 px-3 py-2 text-white border-0 shadow-sm"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

// for sacred destinations card
export const SacredDestinationsCard = ({ destination }) => {
    return (
        <>
            <div className="card sacred-dest-card h-100 border-0 shadow-sm overflow-hidden">
                {/* Image Container with Overlay */}
                <div className="position-relative card-image-wrapper overflow-hidden">
                    <Image
                        src={destination.image}
                        alt={destination.name}
                        width={400}
                        height={250}
                        className="card-img-top object-fit-cover transition-transform"
                    />

                    {/* Dark Gradient Overlay for readability */}
                    <div className="card-img-overlay-gradient position-absolute bottom-0 start-0 w-100 p-3 z-3">
                        <div className="d-flex align-items-center gap-2 text-white">
                            <MapPin size={18} className="flex-shrink-0" />
                            <span className="fw-medium small text-light">{destination.location}</span>
                        </div>
                    </div>
                </div>

                {/* Content Body */}
                <div className="card-body p-4">
                    <h3 className="h5 fw-bold text-brand-dark mb-2">
                        {destination.name}
                    </h3>
                    <p className="card-text text-muted small mb-4 leading-relaxed">
                        {destination.description}
                    </p>
                </div>
            </div>
        </>
    )
}

// rental car card
export const RentalCarCard = ({ car, onBook }) => {
    const params = useParams();
    const currentLocale = params?.locale || 'en';

    return (
        <div className="card rental-car-card h-100 border-0 shadow-sm overflow-hidden">
            {/* Image Container with Overlay */}
            <div className="position-relative overflow-hidden">
                <Image
                    src={car.image}
                    alt={car.name}
                    width={200}
                    height={200}
                    className="card-img-top object-fit-cover transition-transform"
                />
            </div>

            {/* Content Body */}
            <div className="card-body p-4">
                <div className='d-flex align-items-center justify-content-between'>
                    <h3 className="h5 fw-bold text-brand-dark mb-2">
                        {car.name}
                    </h3>
                    <p className="card-text d-flex align-items-center mb-2 gap-2 text-muted small leading-relaxed">
                        <Users size={16} />
                        {car.capacity}
                    </p>
                </div>
                {/* Features */}
                <Row className='px-2 mb-3 row-gap-2'>
                    {car.features.map((feature, idx) => (
                        <Col key={idx} lg={6} xs={6} className='px-2'>
                            <span
                                className="primery-color d-flex align-items-center gap-2 fw-bold border-light"
                            >
                                <IconResolver featureName={feature} />
                                {feature}
                            </span>
                        </Col>
                    ))}
                </Row>
                {/* Footer Logic */}
                < div className="d-flex align-items-center justify-content-between mt-auto border-top pt-3" >
                    <div className='d-flex align-items-end'>
                        <span className="h4 fw-bold text-brand-orange mb-0">{car.price} /&nbsp;</span>
                        <small className="text-muted d-block smaller mb-1">per Day</small>
                    </div>

                    {/* whatsapp btn */}
                    < WhatsappBtn
                        type='button'
                        onClick={onBook}
                        title="Book Now"
                        className="whatsapp-btn d-flex align-items-center border-0 shadow-sm"
                    />
                </div>
            </div>
        </div >
    )
}

// tour package card
export const TourPackageCard = ({ tour, tourLink }) => {
    const params = useParams();
    const currentLocale = params?.locale || 'en';

    return (
        <>
            <div className='tour-package-card card h-100 border-0 shadow-sm overflow-hidden'>
                {/* Image Container with Overlay */}
                <div className="position-relative card-image-wrapper overflow-hidden">
                    <Image
                        src={tour.image}
                        alt={tour.name}
                        width={200}
                        height={200}
                        className="card-img-top object-fit-cover transition-transform"
                    />
                </div>

                {/* Content Body */}
                <div className="card-body p-4">
                    <div className='d-flex flex-column align-items-start justify-content-between'>
                        <h3 className="h5 fw-bold text-brand-dark mb-2">
                            {tour.name}
                        </h3>
                        <p className="card-text d-flex align-items-center gap-2 text-muted small mb-2 leading-relaxed">
                            <Clock size={16} />
                            {tour.duration}
                        </p>
                    </div>
                    {/* Footer Logic */}
                    <div className="d-flex align-items-center justify-content-between mt-auto mb-2">
                        <div className='d-flex align-items-end'>
                            <span className="h4 fw-bold text-brand-orange mb-0">{tour.price} /&nbsp;</span>
                            <small className="text-muted d-block smaller mb-1">per Day</small>
                        </div>
                    </div>
                    {/* Features */}
                    <ul className="d-flex flex-column flex-wrap gap-2 mb-3 p-0">
                        {tour.features.map((feature, idx) => (
                            <li
                                key={idx}
                                className="d-flex align-items-center justify-content-start gap-2"
                            >
                                <span className='primery-color'><ChevronRight size={16} /></span>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    {/* link btn */}
                    {/* <WhatsappBtn
                        type='button'
                        // onClick={onBookNow}
                        title="Book Now"
                        className="primery-btn w-100 d-flex justify-content-center align-items-center border-0 shadow-sm"
                    /> */}
                    <Link
                        href={tourLink || "#"}
                        className="primery-btn py-2 text-decoration-none w-100 d-flex justify-content-center align-items-center mt-auto"
                    >
                        View Details
                    </Link>
                </div>
            </div>

        </>
    )
}

// Header Hero Card

export const HeroHeaderCard = ({ heroTitle, heroSubtitle, heroImage = "/images/contact-page-bg.png", imgClass = "hero-img" }) => {
    return (
        <>
            <div className="contact-hero-card">
                <div className="hero-overlay">
                    <Container>
                        <div className="hero-content">
                            <span className="hero-subtitle">{heroSubtitle}</span>
                            <h1 className="hero-title">{heroTitle}</h1>
                        </div>
                    </Container>
                </div>
                <Image
                    src={heroImage}
                    alt="Godavari River Nashik"
                    fill
                    className={imgClass}
                />
            </div>
        </>
    )
}