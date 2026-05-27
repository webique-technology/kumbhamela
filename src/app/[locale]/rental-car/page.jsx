"use client";
import React, { useState, useEffect, Suspense } from "react";

import { Col, Container, Nav, Row, Tab } from "react-bootstrap";

import { TitleComponent, SearchFleet } from "@/components/ui/common";

import { HeroHeaderCard, RentalCarCard } from "@/components/ui/card";

import { BookingForm } from "@/components/ui/bookingFormHandler";

import { useRouter, useSearchParams } from "next/navigation";

import {
  Sparkles,
  ShieldCheck,
  SprayCan,
  PhoneCall,
  Award,
} from "lucide-react";

import Image from "next/image";

import "../../../styles/rental-car.scss";
import "../../../assets/scss/main.scss";

import { getCars } from "./carApi";

const RentalCarContent = () => {
  const router = useRouter();

  const [show, setShow] = useState(false);
  const [selectedCar, setSelectedCar] = useState("");

  const [activeTab, setActiveTab] = useState("all-car");

  const [cars, setCars] = useState([]);

  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });

  const searchParams = useSearchParams();

  const nameFilter = searchParams.get("name");

  const categoryFilter = searchParams.get("category");

  const priceFilter = searchParams.get("price");

  const currentPage = Number(searchParams.get("page")) || 1;

  const handleOpenBooking = (carName) => {
    setSelectedCar(carName);
    setShow(true);
  };

  const finalDisplayCars = cars.filter((car) => {
    if (activeTab === "all-car") return true;

    return car.category === activeTab;
  });

  useEffect(() => {
    fetchCars(currentPage, nameFilter, categoryFilter, priceFilter);
  }, [currentPage, nameFilter, categoryFilter, priceFilter]);

  const fetchCars = async (page = 1, name = "", category = "", price = "") => {
    try {
      setLoading(true);

      const apiData = await getCars(page, name, category, price);

      setCars(apiData.data || []);

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
    return <div className="text-center py-5">Loading cars...</div>;
  }

  return (
    <section className="section-padding secondary-bg">
      <Container>
        <Tab.Container
          id="car-tabs"
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
        >
          <Row className="align-items-center mb-5">
            <Col md={7}>
              <TitleComponent
                className="text-start mb-0"
                title="Select your preferred transport"
                montezSubTitle="Our Collections"
                montezClass="primery-color montez-sub-heading"
                divider={false}
              />
            </Col>

            <Col md={5} className="mt-4 mt-md-0">
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
                    SUV/MUV
                  </Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="Traveller" className="car-tab-item">
                    Traveller
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>

          <Tab.Content>
            <Tab.Pane eventKey={activeTab}>
              {finalDisplayCars.length > 0 ? (
                <Row className="g-4">
                  {finalDisplayCars.map((value, index) => (
                    <Col key={index} lg={4} md={6}>
                      <RentalCarCard
                        car={value}
                        onBook={() => handleOpenBooking(value.name)}
                      />
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="text-center py-5">
                  <h4 className="text-muted">
                    No {activeTab === "all-car" ? "" : activeTab} cars available
                    in this search.
                  </h4>
                </div>
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        {/* Pagination */}
        {pagination.last_page > 1 && (
          <div className="d-flex justify-content-center gap-2 mt-5">
            {[...Array(pagination.last_page)].map((_, i) => {
              const pageNum = i + 1;

              return (
                <button
                  key={pageNum}
                  className={`pagination-number ${
                    currentPage === pageNum ? "active" : ""
                  }`}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams.toString());

                    params.set("page", pageNum);

                    router.push(`?${params.toString()}`);
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        )}

        <BookingForm
          show={show}
          handleClose={() => setShow(false)}
          type="car"
          selectedItem={selectedCar}
        />
      </Container>
    </section>
  );
};

export default function RentalCar() {
    return (
        <main>
            <Suspense fallback={<div className="section-padding text-center">Loading Fleet...</div>}>
                {/* Hero Section */}
                <section>
                    <HeroHeaderCard
                        heroTitle="Pilgrim Concierge & Support"
                        heroSubtitle="Connect With Us"
                        heroImage="/images/contact-page-bg.png"
                        imgClass="hero-img"
                        showSearch={true}
                    />
                </section>
                {/* <section className="hero-rental-section section-padding">
                    <Container>
                        <Row className="align-items-center gy-5">
                            <Col md={6} className="hero-content">
                                <div className="badge-wrapper">
                                    <Sparkles size={14} className="me-2" />
                                    <span>Premium Pilgrimage Fleet</span>
                                </div>
                                <h1 className="hero-title fw-bold">
                                    Ride in Comfort to <span className="primery-color fw-bold hero-span">Nashik Kumbh</span>
                                </h1>
                                <p className="hero-description mt-3">
                                    Experience spiritual serenity without the commute stress. Our curated
                                    fleet of private vehicles ensures you reach the Ghats with peace of mind.
                                </p>
                            </Col>

                            <Col md={6} className="hero-image-wrapper">
                                <div className="main-image-container">
                                    <Image
                                        src="/images/car-page-img-1.png"
                                        alt="Luxury sedan for Kumbh Mela"
                                        width={600}
                                        height={400}
                                        className="img-fluid hero-img"
                                        priority
                                    />
                                    <div className="support-card shadow-sm">
                                        <div className="support-number">24/7</div>
                                        <div className="support-text">Driver Support</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section> */}

                {/* Filter Section */}
                {/* <section className="filter-section section-padding">
                    <Container>
                        <div className="search-fleet-wrapper">
                            <SearchFleet />
                        </div>
                    </Container>
                </section> */}

                {/* card section */}
                <RentalCarContent />

                {/* bento grid */}
                <section className="bento-features-section section-padding">
                    <Container>
                        <TitleComponent
                            title="The Pilgrim's Standard"
                            description=""
                            divider={false}
                        />
                        <Row className="bento-grid g-4">
                            {/* Card 1: Vetted Drivers (Large) */}
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

                            {/* Card 2: Guarantee (Small Highlight) */}
                            <Col sm={6} lg={3}>
                                <div className='bento-item item-highlight shadow-lg'>
                                    <ShieldCheck className="mb-4" size={48} />
                                    <h4 className="stat-number">100% Booking Guarantee</h4>
                                    {/* <p className="stat-label"></p> */}
                                    <p className="stat-desc">
                                        Once confirmed, your vehicle is locked in. No cancellations during the peak mela hours.
                                    </p>
                                </div>
                            </Col>

                            {/* Card 3: Sanitized (Small) */}
                            <Col sm={6} lg={3}>
                                <div className='bento-item justify-content-between item-secondary shadow-lg'>
                                    <SprayCan className="icon-secondary mb-3" size={40} />
                                    <div className="">
                                        <h4 className="card-title-sm">Sanitized Fleet</h4>
                                        <p className="card-text-sm">
                                            Vehicles are deep cleaned after every trip following international hygiene protocols.
                                        </p>
                                    </div>
                                </div>
                            </Col>

                            {/* Card 4: Assistance (Wide) */}
                            <Col sm={6} lg={3} >
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
            </Suspense>
        </main>
    );
}