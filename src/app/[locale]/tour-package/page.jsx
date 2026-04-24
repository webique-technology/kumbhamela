"use client";

import React, { Suspense } from "react";
import { tourPackages } from "@/lib/data";
import { TourPackageCard } from "@/components/ui/card";
import { Col, Row, Container } from "react-bootstrap";
import { SearchFleet, TitleComponent } from "@/components/ui/common";
import { slugify } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../../styles/blog.scss";

const TourPageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // 1. Get Filter Values from URL
    const categoryFilter = searchParams.get("category");
    const priceFilter = searchParams.get("price");
    const currentPage = Number(searchParams.get("page")) || 1;
    const postsPerPage = 9;

    // 2. APPLY FILTER LOGIC
    let filteredTours = tourPackages.filter((tour) => {
        // Filter by Category (Matching tour.name or custom category)
        const matchesCategory = categoryFilter
            ? tour.name.toLowerCase().includes(categoryFilter.toLowerCase())
            : true;

        // Filter by Price
        let matchesPrice = true;
        if (priceFilter) {
            const [min, max] = priceFilter.split("-").map(Number);
            matchesPrice = tour.price >= min && tour.price <= max;
        }

        return matchesCategory && matchesPrice;
    });

    // 3. Pagination Logic (on filtered list)
    const totalTours = filteredTours.length;
    const totalPages = Math.ceil(totalTours / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentTours = filteredTours.slice(startIndex, startIndex + postsPerPage);

    const handlePageChange = (pageNum) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNum.toString());
        router.push(`/tour-package?${params.toString()}`);
    };

    return (
        <section className="section-padding bg-light">
            <Container>
                <TitleComponent
                    title="Tour Packages"
                    description={categoryFilter ? `Showing ${categoryFilter} results` : "Explore our specially curated spiritual journeys"}
                />

                <div className="mb-5">
                    <SearchFleet />
                </div>

                {/* --- Equal Grid: 3 cards per row on LG, 2 on MD --- */}
                {currentTours.length > 0 ? (
                    <Row className="g-4 mb-5">
                        {currentTours.map((tour, index) => (
                            <Col lg={4} md={6} key={tour.id || index}>
                                <TourPackageCard
                                    tour={tour}
                                    tourLink={`/tour-package/${slugify(tour.name || "")}`}
                                    img_height={250}
                                />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <div className="text-center py-5">
                        <h3>No packages found matching your criteria.</h3>
                        <button
                            className="primery-btn py-3"
                            onClick={() => router.push('/tour-package')}
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}

                {/* --- Pagination --- */}
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
            </Container>
        </section>
    );
};

export default function TourPage() {
    return (
        <main>
            <Suspense fallback={<div className="text-center section-padding">Loading Tours...</div>}>
                <TourPageContent />
            </Suspense>
        </main>
    );
}