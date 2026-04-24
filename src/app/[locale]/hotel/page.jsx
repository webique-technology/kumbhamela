"use client";
import React, { useState, Suspense } from 'react'
import { TitleComponent, SearchFleet } from '@/components/ui/common';
import { Col, Container, Row } from 'react-bootstrap';
import { hotels } from '@/lib/data';
import { HotelCards } from '@/components/ui/card';
import { BookingForm } from '@/components/ui/bookingFormHandler';
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../../styles/hotel-accomodation.scss";
import "../../../assets/scss/main.scss"

const HotelPageContent = () => {
    const [show, setShow] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    const nameFilter = searchParams.get("name");
    const categoryFilter = searchParams.get("category");
    const priceFilter = searchParams.get("price");
    const currentPage = Number(searchParams.get("page")) || 1;
    const itemsPerPage = 6;

    const handleOpenBooking = (hotelName) => {
        setSelectedHotel(hotelName);
        setShow(true);
    };

    // Filter Logic
    const filteredHotels = hotels.filter((hotel) => {
        const matchesName = nameFilter ? hotel.name.toLowerCase().includes(nameFilter.toLowerCase()) : true;
        const matchesCat = categoryFilter !== 'all' && categoryFilter ? hotel.type === categoryFilter : true;

        let matchesPrice = true;
        if (priceFilter && priceFilter !== 'all') {
            const [min, max] = priceFilter.split("-").map(Number);
            const hotelPrice = parseInt(hotel.price.replace(/[^\d]/g, ''));
            matchesPrice = hotelPrice >= min && hotelPrice <= max;
        }
        return matchesName && matchesCat && matchesPrice;
    });

    const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
    const currentItems = filteredHotels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNum) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNum);
        router.push(`/hotel?${params.toString()}`);
    };

    return (
        <section className="section-padding">
            <Container>
                <TitleComponent title="Hotels" description="Discover the best hotels for your pilgrimage." />

                <div className="mb-5">
                    <SearchFleet />
                </div>

                {currentItems.length > 0 ? (
                    <Row className="g-4 mb-5">
                        {currentItems.map((hotel, index) => (
                            <Col lg={4} md={6} key={index}>
                                <HotelCards
                                    hotel={hotel}
                                    onBookNow={() => handleOpenBooking(hotel.name)} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div className="text-center py-5">
                        <h3>No packages found matching your criteria.</h3>
                        <button
                            className="primery-btn py-3"
                            onClick={() => router.push('/hotel')}
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="d-flex justify-content-center gap-2">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="pagination-item"><ChevronLeft /></button>
                        {[...Array(totalPages)].map((_, i) => (
                            <button key={i} onClick={() => handlePageChange(i + 1)} className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}>{i + 1}</button>
                        ))}
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="pagination-item"><ChevronRight /></button>
                    </div>
                )}

                <BookingForm
                    show={show}
                    handleClose={() => setShow(false)}
                    type="hotel"
                    selectedItem={selectedHotel}
                />
            </Container>
        </section>
    );
}

export default function HotelPage() {
    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <HotelPageContent />
            </Suspense>
        </main>
    );
}