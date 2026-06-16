"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { TitleComponent, SearchFleet } from "@/components/ui/common";
import { HeroHeaderCard2, RentalCarCard } from "@/components/ui/card";
import { BookingForm } from "@/components/ui/bookingFormHandler";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import "../../../styles/blog.scss";

import {
  Sparkles,
  ShieldCheck,
  SprayCan,
  PhoneCall,
  Award,
  ChevronLeft, ChevronRight
} from "lucide-react";

import Image from "next/image";

import "../../../styles/rental-car.scss";
import "../../../assets/scss/main.scss";

import { getCars } from "./carApi";

const RentalCarContent = () => {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale;
  const searchParams = useSearchParams();

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

  // Extract URL States as the absolute Single Source of Truth
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

  // Synchronized route handle replacing explicit state mutations
  const handleTabChange = (targetTab) => {
    const queryParams = new URLSearchParams(searchParams.toString());

    if (targetTab === "all-car") {
      queryParams.delete("category");
    } else {
      queryParams.set("category", targetTab);
    }

    // Reset pagination to page 1 whenever switching categories
    queryParams.set("page", "1");

    router.push(`/${locale}/rental-car?${queryParams.toString()}`);
  };

  const handlePageChange = (pageNum) => {
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.set("page", pageNum);
    router.push(`/${locale}/rental-car?${queryParams.toString()}`);
  };

  // Fetch data directly using URL parameters
  useEffect(() => {
    // Pass an empty string to the API if "all-car" is selected, 
    // otherwise pass the current active categoryFilter value
    const apiCategoryParam = categoryFilter === "all-car" ? "" : categoryFilter;

    fetchCars(currentPage, nameFilter, apiCategoryParam, priceFilter);
  }, [currentPage, nameFilter, categoryFilter, priceFilter]);

  const fetchCars = async (page = 1, name = "", category = "", price = "") => {
    try {
      setLoading(true);
      const response = await getCars(page, name, category, price);
      const apiData = response;

      console.log("cars data:", apiData.data);


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

  return (
    <section className="section-padding secondary-bg">
      <Container>
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
              <Nav
                variant="pills"
                className="p-1 gap-2 rounded-2 car-nav-pills"
              >
                <Nav.Item>
                  <Nav.Link eventKey="all-car" className="car-tab-item">
                    All Cars
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Sedan" className="car-tab-item">
                    Sedan
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="SUV" className="car-tab-item">
                    SUV
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Traveller" className="car-tab-item">
                    Tempo Traveller
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Urbania" className="car-tab-item">
                    Urbania
                  </Nav.Link>
                </Nav.Item>
                {/* Updated eventKey strings below to align perfectly with your backend model filters */}
                <Nav.Item>
                  <Nav.Link eventKey="Bus" className="car-tab-item">
                    Mini Bus
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="luxury" className="car-tab-item">
                    Luxury Car
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
                  <h4 className="text-muted">Loading fleet options...</h4>
                </div>
              ) : cars.length > 0 ? (
                <Row className="g-4">
                  {cars.map((car, index) => (
                    <Col key={car.id || index} lg={4} md={6}>
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
                    No {categoryFilter === "all-car" ? "" : categoryFilter} cars available in this category.
                  </h4>
                  <button className="primery-btn py-3 mt-3" onClick={() => router.push(`/${locale}/rental-car`)}>
                    Clear All Filters
                  </button>
                </div>
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        {/* Pagination Controls remain unchanged here */}
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

export default function RentalCar() {
  return (
    <main>
      <section>
        <HeroHeaderCard2
          subTitle="Mela Transit & Fleet"
          heroTitle="Sacred Journeys, Seamless Transit"
          description="Our fleet of cars and tempo travellers ensures comfortable journeys to sacred destinations."
          heroTitleClass={"text-light"}
          imgClass="hero-img"
          showSearch={false}
        />
      </section>

      <Suspense fallback={<div className="text-center py-5">Loading Fleet Module...</div>}>
        <RentalCarContent />
      </Suspense>

      <section className="bento-features-section padding-bottom section-padding">
        <Container>
          <TitleComponent
            title="The Pilgrim's Standard"
            description=""
            divider={false}
          />
          <Row className="bento-grid g-4">
            <Col sm={6} lg={3}>
              <div className='bento-item item-large shadow-lg'>
                <div className="content">
                  <Award className="icon-primary mb-4" size={48} />
                  <h4 className="card-title">Vetted & Verified Drivers</h4>
                  <p className="card-text">
                    Every driver undergoes a background check and a specialized orientation
                    for the Nashik city routes and temple etiquettes.
                  </p>
                </div>
              </div>
            </Col>

            <Col sm={6} lg={3}>
              <div className='bento-item item-highlight shadow-lg'>
                <ShieldCheck className="mb-4" size={48} />
                <h4 className="stat-number">100% Booking Guarantee</h4>
                <p className="stat-desc">
                  Once confirmed, your vehicle is locked in. No cancellations during the peak mela hours.
                </p>
              </div>
            </Col>

            <Col sm={6} lg={3}>
              <div className='bento-item justify-content-between item-secondary shadow-lg'>
                <SprayCan className="icon-secondary mb-3" size={40} />
                <div>
                  <h4 className="card-title-sm">Sanitized Fleet</h4>
                  <p className="card-text-sm">
                    Vehicles are deep cleaned after every trip following international hygiene protocols.
                  </p>
                </div>
              </div>
            </Col>

            <Col sm={6} lg={3}>
              <div className='bento-item item-wide shadow-lg'>
                <div className="flex-content">
                  <PhoneCall size={40} />
                  <div className="text-side">
                    <h4 className="card-title">24/7 Roadside Assistance</h4>
                    <p className="card-text">
                      Dedicated helpline for any on-road emergencies, ensuring your journey remains uninterrupted.
                    </p>
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