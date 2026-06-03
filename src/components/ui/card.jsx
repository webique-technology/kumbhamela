"use client";
import React from 'react'
import Image from "next/image";
import { Calendar, Clock, ArrowRight, Star, MapPin, MessageCircle, Users, ChevronRight } from "lucide-react";
import { Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { WhatsappBtn } from './button';
import { SearchFleet, SwiperSliderComp } from './common';
import { SwiperSlide } from 'swiper/react';
import { Col, Container, Row } from 'react-bootstrap';
import IconResolver from './iconResolver';
import { imageUrl } from "@/lib/utils";

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
                <img
                    src={blog.image_url || "/images/tour-section-bg.png"}
                    alt={blog.title}
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
                        {/* <span>{blog.date}</span> */}
                        <span> {new Date(blog.created_at).toLocaleDateString()}</span>
                    </div>
                    {/* <div className="d-flex align-items-center gap-1">
                        <Clock size={14} />
                        <span>{blog.readTime}</span>
                    </div> */}
                </div>

                {/* Title */}
                <Link href={blogLink} className="text-decoration-none">
                    <h3 className="card-title mb-3 fw-semibold text-dark blog-title">
                        {blog.title}
                    </h3>
                </Link>

                {/* Excerpt */}
                {/* <p className="card-text text-muted small blog-excerpt">
                    {blog.description}
                </p> */}
                <p className="card-text text-muted small blog-excerpt">
                    {blog.description
                        ?.replace(/<[^>]*>/g, "")
                        ?.slice(0, 150)}
                    ...
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
                        loop={hotel.images?.length > 1}
                        timeDelay={3000}
                    >
                        {hotel.images?.map((value, index) => (
                            <SwiperSlide key={index}>
                                <Image
                                    src={value}
                                    alt={value.title || "Hotel Image"}
                                    width={400}
                                    height={250}
                                    className="card-img-top object-fit-cover"
                                    style={{ width: '100%', height: 'auto', maxWidth: '100%' }}
                                    priority
                                    unoptimized={process.env.NODE_ENV === "development"}
                                />
                            </SwiperSlide>
                        ))}
                    </SwiperSliderComp>

                    {/* Badge Left */}
                    <div className="position-absolute top-0 start-0 m-3 z-2">
                        <span className="badge badge-left rounded-pill bg-brand-orange">
                            {hotel.category}
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
                    <h3 className="h5 fw-bold text-brand-dark mb-2">{hotel.title}</h3>

                    <div className="d-flex align-items-center gap-2 text-muted small mb-3">
                        <MapPin size={16} className="text-brand-orange" />
                        <span>{hotel.location}</span>
                    </div>

                    {/* Features */}
                    <div className="d-flex flex-wrap gap-2 mb-4">
                        {hotel.features?.map((feature, idx) => (
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
                            <span className="h4 text-brand-orange mb-0">{hotel.base_price}</span>
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
    // console.log("car:", car);
    // console.log("image:", car?.car_image_url);
    console.log("final:", imageUrl(car?.car_image_url));
    return (
        <div className="card rental-car-card h-100 border-0 shadow-sm overflow-hidden">
            {/* Image Container with Overlay */}
            <div className="position-relative overflow-hidden">
                {car?.car_image_url ? (
                    <img
                        src={imageUrl(car.car_image_url)}
                        alt={car.name}
                        width={200}
                        height={200}
                        className="card-img-top object-fit-cover transition-transform"
                    />
                ) : (
                    <div
                        style={{ width: "100%", height: "200px" }}
                        className="card-img-top bg-light"
                    />
                )}
            </div>

            {/* Content Body */}
            <div className="card-body p-4">
                <div className='d-flex align-items-center justify-content-between'>
                    <h3 className="h5 fw-bold text-brand-dark mb-2">
                        {car.name}
                    </h3>
                    <p className="card-text d-flex align-items-center mb-2 gap-2 text-muted small leading-relaxed">
                        <Users size={16} />
                        {car.total_seats}
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
                        <span className="h4 fw-bold text-brand-orange mb-0">{car.base_price} /&nbsp;</span>
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

// // tour package card
// export const TourPackageCard = ({ tour, tourLink }) => {
//     const params = useParams();
//     const currentLocale = params?.locale || 'en';

//     return (
//         <>
//             <div className='tour-package-card card h-100 border-0 shadow-sm overflow-hidden'>
//                 {/* Image Container with Overlay */}
//                 <div className="position-relative card-image-wrapper overflow-hidden">
//                     <Image
//                         src={tour.image}
//                         alt={tour.name}
//                         width={200}
//                         height={200}
//                         className="card-img-top object-fit-cover transition-transform"
//                     />
//                 </div>

//                 {/* Content Body */}
//                 <div className="card-body p-4">
//                     <div className='d-flex flex-column align-items-start justify-content-between'>
//                         <h3 className="sub-heading text-dark mb-2">
//                             {tour.name}
//                         </h3>
//                         <p className="card-text d-flex align-items-center gap-2 text-muted small mb-2 leading-relaxed">
//                             <Clock size={16} />
//                             {tour.duration}
//                         </p>
//                     </div>

//                     {/* Footer Logic */}
//                     <div className="d-flex align-items-center justify-content-between mt-auto mb-2">
//                         <div className='d-flex align-items-end'>
//                             <span className="h5 fw-bold text-brand-orange mb-0">{tour.price} /&nbsp;</span>
//                             <small className="text-muted d-block smaller mb-1">per Person</small>
//                         </div>
//                     </div>

//                     {/* Features */}
//                     <ul className="d-flex flex-column flex-wrap gap-1 mb-3 p-0">
//                         {tour.features.map((feature, idx) => (
//                             <li
//                                 key={idx}
//                                 className="d-flex paragraph align-items-center justify-content-start gap-1"
//                             >
//                                 <span className='primery-color'><ChevronRight size={16} /></span>
//                                 {feature}
//                             </li>
//                         ))}
//                     </ul>

//                     {/* link btn */}
//                     <Link
//                         href={tourLink || "#"}
//                         className="primery-btn py-2 text-decoration-none w-100 d-flex justify-content-center align-items-center mt-auto"
//                     >
//                         View Details
//                     </Link>
//                 </div>
//             </div>

//         </>
//     )
// }

// tour package card
export const TourPackageCard = ({ tour, tourLink }) => {
    const params = useParams();
    const currentLocale = params?.locale || "en";

    // Features safe for array/string/null
    const features = Array.isArray(tour?.features)
        ? tour.features
        : tour?.features
            ? tour.features.split(",")
            : [];

    // Image safe
    const imageSrc =
        // tour?.image || "/images/default-tour.jpg";
        tour?.image_url && tour.image_url.trim() !== "" ? tour.image_url : "/images/river-rituals.webp";


    return (
        <>
            <div className="tour-package-card card h-100 border-0 shadow-sm overflow-hidden">
                {/* Image Container with Overlay */}
                <div className="position-relative card-image-wrapper overflow-hidden">
                    <img
                        src={imageSrc}
                        alt={tour?.title || "Tour"}
                        width={200}
                        height={200}

                        className="card-img-top object-fit-cover transition-transform"
                    />
                </div>

                {/* Content Body */}
                <div className="card-body p-4">
                    <div className="d-flex flex-column align-items-start justify-content-between">
                        <h3 className="sub-heading text-dark mb-2">
                            {tour?.title}
                        </h3>

                        {/* <p className="card-text d-flex align-items-center gap-2 text-muted small mb-2 leading-relaxed">
                            <Clock size={16} />
                            {tour?.duration}
                        </p> */}
                    </div>

                    {/* Footer Logic */}
                    <div className="d-flex align-items-center justify-content-between mt-auto mb-2">
                        <div className="d-flex align-items-end">
                            <p className="mb-0 fw-semibold">
                                Starting from : &nbsp;
                                <span className="h5 fw-bold text-brand-orange mb-0">
                                    ₹{tour?.base_price};
                                </span>
                                {/* <small className="text-muted d-block smaller mb-1">
                                    per Person
                                </small> */}
                            </p>
                        </div>
                    </div>

                    {/* Features */}
                    <ul className="d-flex flex-column flex-wrap gap-1 mb-3 p-0">
                        {tour?.highlights.map((feature, idx) => (
                            <li
                                key={idx}
                                className="d-flex paragraph align-items-center justify-content-start gap-1"
                            >
                                <span className="primery-color">
                                    <ChevronRight size={16} />
                                </span>

                                {feature}
                            </li>
                        ))}
                    </ul>

                    {/* link btn */}
                    <Link
                        href={tourLink || "#"}
                        className="primery-btn py-2 text-decoration-none w-100 d-flex justify-content-center align-items-center mt-auto"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </>
    );
};

// Header Hero Card
export const HeroHeaderCard = ({ showSearch = true, heroTitle, description, heroSubtitle, heroImage = "/images/contact-page-bg.png", imgClass = "hero-img" }) => {

    return (
        <>
            <div
                className="hero-header-card d-flex align-items-center"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                <Container>
                    <div className="hero-content position-relative z-3">
                        <span className="hero-subtitle">{heroSubtitle}</span>
                        <h1 className="hero-title">{heroTitle}</h1>
                    </div>
                    {showSearch && (
                        <div className="hero-search-wrapper mt-4">
                            <SearchFleet />
                        </div>
                    )}
                </Container>
            </div>
        </>
    )
}

export const PaymentTerms = ({ terms = "No cancellation charges for booking modification or cancellation done 24 hours before the scheduled tour date.A 5% charge will be applicable for cancellations made within 24 hours of the tour.", policy }) => {
    return (
        <>
            <div className="p-3 bg-light rounded">
                <h6 className="fw-bold">Payment Terms</h6>
                <p className="text-secondary small mb-0">{policy.content}</p>
            </div>
        </>
    )
}