"use client";

// import React from "react";
// import { tourPackages } from "@/lib/data";
import { TourPackageCard } from "@/components/ui/card";
import { Col, Row, Container } from "react-bootstrap";
import { SearchFleet, TitleComponent } from "@/components/ui/common";
import { slugify } from "@/lib/utils";
import { useRouter, useSearchParams, useParams  } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../../styles/blog.scss";
import React, { useEffect, useState } from "react";
import { getTours } from "./tourApi";

const TourPageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // 1. Get Filter Values from URL
    const categoryFilter = searchParams.get("category");
    const priceFilter = searchParams.get("price");
    const nameFilter = searchParams.get("name");
    const currentPage = Number(searchParams.get("page")) || 1;
    // const postsPerPage = 9;
    // const itemsPerPage = 9;
    const params = useParams();

    const locale = params.locale;

    // const [tourPackages, setTourPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [tours, setTours] = useState([]);

     const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
    });


      // Filter Logic
    // const filteredTours = tours.filter((tour) => {
    //     const matchesCategory = categoryFilter
    //         ? (tour.name || "")
    //               .toLowerCase()
    //               .includes(categoryFilter.toLowerCase())
    //         : true;

    //     let matchesPrice = true;

    //     if (priceFilter) {
    //         const [min, max] = priceFilter.split("-").map(Number);

    //         matchesPrice =
    //             Number(tour.price || 0) >= min &&
    //             Number(tour.price || 0) <= max;
    //     }

    //     return matchesCategory && matchesPrice;
    // });

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

    // Pagination
    // const totalPages = Math.ceil(
    //     filteredTours.length / itemsPerPage
    // );

    // const currentItems = filteredTours.slice(
    //     (currentPage - 1) * itemsPerPage,
    //     currentPage * itemsPerPage
    // );
    const currentItems = filteredTours;

    const totalPages = pagination.last_page;

    const handlePageChange = (pageNum) => {
        // const params = new URLSearchParams(searchParams);
        // params.set("page", pageNum);

        // router.push(`/tour-package?${params.toString()}`);

        const queryParams = new URLSearchParams(searchParams);

        queryParams.set("page", pageNum);

        router.push(`/${locale}/tour-package?${queryParams.toString()}`);
    };

     // API call
    useEffect(() => {
        fetchTours( currentPage,nameFilter,categoryFilter,priceFilter);
    }, [currentPage, nameFilter, categoryFilter, priceFilter]);

    const fetchTours = async (page = 1,name = "",category = "",price = "") => {
        try {
            // const data = await getTours();
            // setTours(data || []);
        setLoading(true);
        const response = await getTours( page,name,category,price);
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

    if (loading) {
        return (
            <div className="text-center py-5">
                Loading tours...
            </div>
        );
    }

    // 2. APPLY FILTER LOGIC
    // let filteredTours = tourPackages.filter((tour) => {
    //     // Filter by Category (Matching tour.name or custom category)
    //     const matchesCategory = categoryFilter
    //         ? tour.name.toLowerCase().includes(categoryFilter.toLowerCase())
    //         : true;

    //     // Filter by Price
    //     let matchesPrice = true;
    //     if (priceFilter) {
    //         const [min, max] = priceFilter.split("-").map(Number);
    //         matchesPrice = tour.price >= min && tour.price <= max;
    //     }

    //     return matchesCategory && matchesPrice;
    // });

    // 3. Pagination Logic (on filtered list)
    // const totalTours = filteredTours.length;
    // const totalPages = Math.ceil(totalTours / postsPerPage);
    // const startIndex = (currentPage - 1) * postsPerPage;
    // const currentTours = filteredTours.slice(startIndex, startIndex + postsPerPage);

    // const handlePageChange = (pageNum) => {
    //     const params = new URLSearchParams(searchParams);
    //     params.set("page", pageNum.toString());
    //     router.push(`/tour-package?${params.toString()}`);
    // };

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
                {currentItems.length > 0 ? (
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
                ) : (
                    <div className="text-center py-5">
                        <h3>No packages found matching your criteria.</h3>
                        <button
                            className="primery-btn py-3"
                            onClick={() => router.push(`/${locale}/tour-package`)}
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

export default function TourDetailPage() {
    return (
        <TourPageContent />
    );
}