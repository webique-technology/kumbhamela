"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { TitleComponent, SearchFleet } from "@/components/ui/common";
import { HeroHeaderCard2, RentalCarCard } from "@/components/ui/card";
import { BookingForm } from "@/components/ui/bookingFormHandler";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import "../../../styles/blog.scss";

import {
    Sparkles,
    ShieldCheck,
    SprayCan,
    PhoneCall,
    Award,
    ChevronLeft, ChevronRight
} from "lucide-react";

import "../../../styles/rental-car.scss";
import "../../../assets/scss/main.scss";

import { getCars } from "./carApi";

const RentalCarContent = () => {
    const router = useRouter();
    const params = useParams();
    const locale = params.locale;
    const searchParams = useSearchParams();

    // Bind global localization contexts matching key definitions namespaces
    const t = useTranslations("RentalCar");

    const [show, setShow] = useState(false);
    const [selectedCar, setSelectedCar] = useState("");
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        total: 0,
        links: [],
    });

    const nameFilter = searchParams.get("name") || "";
    const categoryFilter = searchParams.get("category") || "all-car";
    const priceFilter = searchParams.get("price") || "";
    const currentPage = Number(searchParams.get("page")) || 1;
    const totalPages = pagination.last_page;

    const [selectedCarId, setSelectedCarId] = useState(null);

    const handleOpenBooking = (car) => {
        setSelectedCar(car.name);
        setSelectedCarId(car.id);
        setShow(true);
    };

    const handleTabChange = (targetTab) => {
        const queryParams = new URLSearchParams(searchParams.toString());
        if (targetTab === "all-car") {
            queryParams.delete("category");
        } else {
            queryParams.set("category", targetTab);
        }
        queryParams.set("page", "1");
        router.push(`/${locale}/rental-car?${queryParams.toString()}`);
    };

    const handlePageChange = (pageNum) => {
        const queryParams = new URLSearchParams(searchParams.toString());
        queryParams.set("page", pageNum);
        router.push(`/${locale}/rental-car?${queryParams.toString()}`);
    };

    useEffect(() => {
        const apiCategoryParam = categoryFilter === "all-car" ? "" : categoryFilter;
        fetchCars(currentPage, nameFilter, apiCategoryParam, priceFilter);
    }, [currentPage, nameFilter, categoryFilter, priceFilter]);

    const fetchCars = async (page = 1, name = "", category = "", price = "") => {
        try {
            setLoading(true);
            const response = await getCars(page, name, category, price);
            const apiData = response;
            setCars(apiData.data || []);
            setPagination({
                current_page: apiData.current_page,
                last_page: apiData.last_page,
                total: apiData.total,
                links: apiData.links || [],
            });
        } catch (error) {
            console.error("Error fetching vehicles:", error);
        } finally {
            setLoading(false);
        }
    };

    // Safely reads the currently active target category's translated tab label string
    const getActiveCategoryTranslatedLabel = () => {
        if (categoryFilter === "all-car") return "";
        const mapping = {
            Sedan: "sedan",
            SUV: "suv",
            Traveller: "traveller",
            Urbania: "urbania",
            Bus: "bus",
            luxury: "luxury"
        };
        const key = mapping[categoryFilter];
        return key ? t(`Tabs.${key}`) : categoryFilter;
    };

    return (
        <section className="section-padding secondary-bg">
            <Container>
                <div className='my-2 text-center'>
                    <p className='m-0 text-danger fw-semibold fs-6'>{t("carNote")}</p>
                </div>
                <Tab.Container
                    id="car-tabs"
                    activeKey={categoryFilter}
                    onSelect={(k) => handleTabChange(k || "all-car")}
                >
                    <Row className="align-items-center mb-5">
                        <Col md={7}>
                            <TitleComponent
                                className="text-start mb-0"
                                montezClass="primery-color playfair-display"
                                divider={false}
                            />
                        </Col>

                        <Col md={12} className="mt-4 mt-md-0">
                            <Nav variant="pills" className="p-1 gap-2 rounded-2 car-nav-pills">
                                <Nav.Item>
                                    <Nav.Link eventKey="all-car" className="car-tab-item shadow-sm border">
                                        {t("Tabs.all")}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Sedan" className="car-tab-item shadow-sm border">
                                        {t("Tabs.sedan")}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="SUV" className="car-tab-item shadow-sm border">
                                        {t("Tabs.suv")}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Traveller" className="car-tab-item shadow-sm border">
                                        {t("Tabs.traveller")}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Urbania" className="car-tab-item shadow-sm border">
                                        {t("Tabs.urbania")}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="Bus" className="car-tab-item shadow-sm border">
                                        {t("Tabs.bus")}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="luxury" className="car-tab-item shadow-sm border">
                                        {t("Tabs.luxury")}
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>

                    <Tab.Content>
                        <Tab.Pane eventKey={categoryFilter}>
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary mb-3" role="status"></div>
                                    <h4 className="text-muted">{t("Status.loading")}</h4>
                                </div>
                            ) : cars.length > 0 ? (
                                <Row className="g-4">
                                    {cars.map((car, index) => (
                                        <Col key={car.id || index} lg={4} md={6} className="d-flex">
                                            <RentalCarCard
                                                car={car}
                                                onBook={() => handleOpenBooking(car)}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <div className="text-center py-5">
                                    <h4 className="text-muted">
                                        {t("Status.noResults", { category: getActiveCategoryTranslatedLabel() })}
                                    </h4>
                                    <button className="primery-btn py-3 mt-3" onClick={() => router.push(`/${locale}/rental-car`)}>
                                        {t("Status.clearFilters")}
                                    </button>
                                </div>
                            )}
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>

                {!loading && totalPages > 1 && (
                    <div className="d-flex justify-content-center align-items-center pagination-wrapper gap-2 mt-5">
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
                                    className={`pagination-number shadow-sm border number ${currentPage === pageNum ? 'active' : ''}`}
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

                <BookingForm
                    show={show}
                    handleClose={() => setShow(false)}
                    type="car"
                    selectedItem={selectedCar}
                    carId={selectedCarId}
                />
            </Container>
        </section>
    );
};

export default function RentalCarPage() {
    const t = useTranslations("RentalCar");
    return (
        <main>
            <section>
                <HeroHeaderCard2
                    subTitle={t("Hero.subTitle")}
                    heroTitle={t("Hero.title")}
                    description={t("Hero.description")}
                    heroTitleClass="text-light"
                    imgClass="hero-img"
                    showSearch={false}
                // redText={"Our per-km rates may change based on current fuel prices and market trends"}
                />
            </section>

            <Suspense fallback={<div className="text-center py-5">Loading Fleet Module...</div>}>
                <RentalCarContent />
            </Suspense>

            <section className="bento-features-section padding-bottom section-padding">
                <Container>
                    <TitleComponent
                        title={t("Bento.sectionTitle")}
                        description=""
                        divider={false}
                    />
                    <Row className="bento-grid g-4">
                        <Col sm={6} lg={3}>
                            <div className='bento-item item-large shadow-lg'>
                                <div className="content">
                                    <Award className="icon-primary mb-4" size={48} />
                                    <h4 className="card-title">{t("Bento.card1.title")}</h4>
                                    <p className="card-text">{t("Bento.card1.text")}</p>
                                </div>
                            </div>
                        </Col>

                        <Col sm={6} lg={3}>
                            <div className='bento-item item-highlight shadow-lg'>
                                <ShieldCheck className="mb-4" size={48} />
                                <h4 className="stat-number">{t("Bento.card2.title")}</h4>
                                <p className="stat-desc">{t("Bento.card2.text")}</p>
                            </div>
                        </Col>

                        <Col sm={6} lg={3}>
                            <div className='bento-item justify-content-between item-secondary shadow-lg'>
                                <SprayCan className="icon-secondary mb-3" size={40} />
                                <div>
                                    <h4 className="card-title-sm">{t("Bento.card3.title")}</h4>
                                    <p className="card-text-sm">{t("Bento.card3.text")}</p>
                                </div>
                            </div>
                        </Col>

                        <Col sm={6} lg={3}>
                            <div className='bento-item item-wide shadow-lg'>
                                <div className="flex-content">
                                    <PhoneCall size={40} />
                                    <div className="text-side">
                                        <h4 className="card-title">{t("Bento.card4.title")}</h4>
                                        <p className="card-text">{t("Bento.card4.text")}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    );
}