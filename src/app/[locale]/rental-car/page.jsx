"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import { TitleComponent, SearchFleet } from "@/components/ui/common";
import { HeroHeaderCard, RentalCarCard } from "@/components/ui/card";
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

  const [show, setShow] = useState(false);
  const [selectedCar, setSelectedCar] = useState("");
  const [activeTab, setActiveTab] = useState("all-car");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
    links: [],
  });

  const searchParams = useSearchParams();
  const nameFilter = searchParams.get("name");
  const categoryFilter = searchParams.get("category");
  const priceFilter = searchParams.get("price");
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = pagination.last_page;

  const handleOpenBooking = (carName) => {
    setSelectedCar(carName);
    setShow(true);
  };

  const finalDisplayCars = cars.filter((car) => {
    if (activeTab === "all-car") return true;
    return car.category === activeTab;
  });

  const handlePageChange = (pageNum) => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set("page", pageNum);
    router.push(`/${locale}/rental-car?${queryParams.toString()}`);
  };

  useEffect(() => {
    fetchCars(currentPage, nameFilter, categoryFilter, priceFilter);
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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
                montezClass="primery-color montez-sub-heading"
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
                <Nav.Item>
                  <Nav.Link eventKey="Minibus" className="car-tab-item">
                    Mini Bus
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Luxurycar" className="car-tab-item">
                    Luxury Car
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>

          <Tab.Content>
            <Tab.Pane eventKey={activeTab}>
              
              {/* --- CONTROLLED INNER REGION LOADING STATE LOOP --- */}
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary mb-3" role="status"></div>
                  <h4 className="text-muted">Loading fleet options...</h4>
                </div>
              ) : finalDisplayCars.length > 0 ? (
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
                    No {activeTab === "all-car" ? "" : activeTab} cars available in this search.
                  </h4>
                  <button className="primery-btn py-3 mt-3" onClick={() => router.push(`/${locale}/rental-car`)}> 
                    Clear All Filters 
                  </button>
                </div>
              )}

            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>

        {/* Pagination - Kept inside content flow wrapper safely */}
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
      {/* Hero Section Banner remains completely static, unaffected by state changes */}
      <section>
        <HeroHeaderCard
          heroTitle="Select your preferred transport"
          heroImage="/images/carrental-page-bg.png"
          imgClass="hero-img"
          showSearch={true}
        />
      </section>

      {/* Card display grid utilizing React Suspense boundaries for handling query parameters assembly */}
      <Suspense fallback={<div className="text-center py-5">Loading Fleet Module...</div>}>
        <RentalCarContent />
      </Suspense>

      {/* Bento feature matrix - Stays mounted securely below without popping layout layout shifts */}
      <section className="bento-features-section section-padding">
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