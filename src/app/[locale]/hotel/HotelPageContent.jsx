"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BookingForm } from '@/components/ui/bookingFormHandler';
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchFilter } from "@/hooks/useSearchFilter";
import "../../../styles/hotel-accomodation.scss";
import "../../../assets/scss/main.scss";
import { getHotels } from "./hotelApi";
import { HotelCards } from '@/components/ui/card';

export const HotelPageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [show, setShow] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedHotel, setSelectedHotel] = useState(null);

    // Track if the loading is caused by a page transition
    const [isNavigating, setIsNavigating] = useState(false);
    const isFirstLoad = useRef(true);

    const currentPage = Number(searchParams.get("page")) || 1;
    const itemsPerPage = 6;

    const handleOpenBooking = (hotel) => {
        setSelectedHotel(hotel);
        setShow(true);
    };

    // Filter Logic
    const filteredHotels = useSearchFilter(hotels);
    const totalPages = Math.ceil(filteredHotels.length / itemsPerPage);
    const currentItems = filteredHotels.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (pageNum) => {
        setIsNavigating(true); // Explicitly mark that a pagination click triggered this change
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNum);
        router.push(`/hotel?${params.toString()}`);
    };

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                setLoading(true);

                // Set dynamic duration: 1 second on navigation, 2 seconds on initial asset initialization
                const delayDuration = isNavigating ? 500 : 500;
                const delay = new Promise((resolve) => setTimeout(resolve, delayDuration));

                // Execute API call and customized timer window concurrently
                const [data] = await Promise.all([
                    getHotels(),
                    delay
                ]);

                setHotels(data.data || []);
            } catch (error) {
                console.error("Error fetching hotels:", error);
            } finally {
                setLoading(false);
                setIsNavigating(false); // Reset tracking flag for subsequent steps
            }
        };

        fetchHotels();
    }, [currentPage]);

    return (
        <>
            <section className="section-padding padding-bottom">
                <Container>

                    {/* SCOPED LOADING CONTAINER */}
                    {loading ? (
                        <div className="text-center py-5 my-5">
                            <div className="spinner-border text-primary mb-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <h4>Loading hotels & accommodations...</h4>
                        </div>
                    ) : currentItems.length > 0 ? (
                        <Row className="g-4 mb-5">
                            {currentItems.map((hotel, index) => (
                                <Col lg={4} md={6} key={hotel.id || index}>
                                    <HotelCards
                                        hotel={hotel}
                                        onBookNow={() => handleOpenBooking(hotel)}
                                    />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <div className="text-center py-5">
                            <h3>No packages found matching your criteria.</h3>
                            <button
                                className="primery-btn py-3 mt-3"
                                onClick={() => router.push('/hotel')}
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && totalPages > 1 && (
                        <div className="d-flex justify-content-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="pagination-item"
                            >
                                <ChevronLeft />
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`pagination-number border shadow-sm ${currentPage === i + 1 ? 'active' : ''}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="pagination-item"
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    )}

                    <BookingForm
                        show={show}
                        handleClose={() => setShow(false)}
                        type="hotel"
                        selectedItem={selectedHotel?.title}
                        hotelId={selectedHotel?.id}
                    />
                </Container>
            </section>
        </>
    );
};