"use client";
import React, { useEffect, useState, Suspense } from "react";
// import { tourPackages } from "@/lib/data";
import { HeroHeaderCard, TourPackageCard } from "@/components/ui/card";
import { Col, Row, Container } from "react-bootstrap";
import { slugify } from "@/lib/utils";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../../styles/blog.scss";
import { getTours } from "./tourApi";

const TourPageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // 1. Get Filter Values from URL
    const categoryFilter = searchParams.get("category");
    const priceFilter = searchParams.get("price");
    const nameFilter = searchParams.get("name");
    const currentPage = Number(searchParams.get("page")) || 1;
    const params = useParams();

    const locale = params.locale;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tours, setTours] = useState([]);

    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
    });

    const filteredTours = tours.filter((tour) => {
        const matchesCategory = categoryFilter
            ? (tour.name || tour.title || "")
                .toLowerCase()
                .includes(categoryFilter.toLowerCase())
            : true;

        let matchesPrice = true;

        if (priceFilter) {
            const [min, max] = priceFilter.split("-").map(Number);

            matchesPrice =
                Number(tour.price || 0) >= min &&
                Number(tour.price || 0) <= max;
        }

        return matchesCategory && matchesPrice;
    });

    const currentItems = filteredTours;
    const totalPages = pagination.last_page;

    const handlePageChange = (pageNum) => {
        const queryParams = new URLSearchParams(searchParams);
        queryParams.set("page", pageNum);
        router.push(`/${locale}/tour-package?${queryParams.toString()}`);
    };

    // API call
    useEffect(() => {
        fetchTours(currentPage, nameFilter, categoryFilter, priceFilter);
    }, [currentPage, nameFilter, categoryFilter, priceFilter]);

    const fetchTours = async (page = 1, name = "", category = "", price = "") => {
        try {
            setLoading(true);
            const response = await getTours(page, name, category, price);
            const apiData = response;
            setTours(apiData.data || []);

            setPagination({
                current_page: apiData.current_page,
                last_page: apiData.last_page,
                total: apiData.total,
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section>
            {/* The static banner header stays completely visible and unaffected when components are updating */}
            <HeroHeaderCard
                heroTitle="Tour Packages"
                heroImage="/images/carrental-page-bg.png"
                imgClass="hero-img"
                showSearch={true}
            />

            <section className="section-padding secondary-bg">
                <Container>

                    {/* --- TARGETED DATA LOADING STATE LAYER --- */}
                    {loading ? (
                        <div className="text-center py-5 section-padding">
                            <div className="spinner-border text-primary mb-3" role="status"></div>
                            <h4>Loading Tours...</h4>
                        </div>
                    ) : currentItems.length > 0 ? (
                        <>
                            {/* --- Equal Grid: 3 cards per row on LG, 2 on MD --- */}
                            <Row className="g-4 mb-5">
                                {currentItems.map((tour, index) => (
                                    <Col lg={4} md={6} key={tour.id || index}>
                                        <TourPackageCard
                                            tour={tour}
                                            tourLink={`/tour-package/${slugify(tour.title || "")}`}
                                            img_height={250}
                                        />
                                    </Col>
                                ))}
                            </Row>

                            {/* --- Pagination Controls --- */}
                            {totalPages > 1 && (
                                <div className="d-flex justify-content-center align-items-center pagination-wrapper gap-2">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className={`pagination-item arrow ${currentPage === 1 ? 'disabled' : ''}`}
                                        disabled={currentPage === 1}
                                    >
                                        <ChevronLeft size={18} />
                                    </button>

                                    {[...Array(totalPages)].map((_, i) => {
                                        const pageNum = i + 1;
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`pagination-number number ${currentPage === pageNum ? 'active' : ''}`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className={`pagination-item arrow ${currentPage === totalPages ? 'disabled' : ''}`}
                                        disabled={currentPage === totalPages}
                                    >
                                        <ChevronRight size={18} />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-5">
                            <h3>No packages found matching your criteria.</h3>
                            <button
                                className="primery-btn py-3 mt-3"
                                onClick={() => router.push(`/${locale}/tour-package`)}
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}

                </Container>
            </section>
        </section >
    );
};

// Next.js App Router requires useSearchParams to be wrapped globally in Suspense to prevent build compilation errors
export default function TourDetailPage() {
    return (
        <Suspense fallback={<div className="text-center py-5">Loading Page Layout...</div>}>
            <TourPageContent />
        </Suspense>
    );
}