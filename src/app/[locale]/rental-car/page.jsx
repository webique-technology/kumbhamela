"use client";
import React, { useState, Suspense } from 'react'
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import { TitleComponent, SearchFleet } from '@/components/ui/common'
import { rentalCar } from '@/lib/data'
import { RentalCarCard } from '@/components/ui/card'
import { BookingForm } from '@/components/ui/bookingFormHandler'
import { useRouter, useSearchParams } from "next/navigation";
import { Sparkles, ShieldCheck, SprayCan, PhoneCall, Award } from "lucide-react";
import Image from "next/image";
import "../../../styles/rental-car.scss";
import "../../../assets/scss/main.scss"

const RentalCarContent = () => {
    const [show, setShow] = useState(false);
    const [selectedCar, setSelectedCar] = useState("");
    const [activeTab, setActiveTab] = useState("all-car"); // State to track active tab

    const router = useRouter();
    const searchParams = useSearchParams();

    // Filters from URL
    const nameFilter = searchParams.get("name");
    const categoryFilter = searchParams.get("category");
    const priceFilter = searchParams.get("price");

    const handleOpenBooking = (carName) => {
        setSelectedCar(carName);
        setShow(true);
    };

    // 1. Initial Filtering (Search Results)
    const searchFilteredCars = rentalCar.filter((car) => {
        const matchesName = nameFilter ? car.name.toLowerCase().includes(nameFilter.toLowerCase()) : true;
        const matchesCat = categoryFilter && categoryFilter !== 'all' ? car.type === categoryFilter : true;

        let matchesPrice = true;
        if (priceFilter && priceFilter !== 'all') {
            const [min, max] = priceFilter.split("-").map(Number);
            matchesPrice = car.price >= min && car.price <= max;
        }
        return matchesName && matchesCat && matchesPrice;
    });

    // 2. Tab Filtering (Category Results)
    const finalDisplayCars = searchFilteredCars.filter((car) => {
        if (activeTab === "all-car") return true;
        return car.type === activeTab;
    });

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
                                className='text-start mb-0'
                                title="Select your preferred transport"
                                description="Our Collections"
                                divider={false}
                            />
                        </Col>
                        <Col md={5} className="mt-4 mt-md-0">
                            <div className=''>
                                <Nav variant="pills" className="justify-content-md-between p-1 gap-2 rounded-2 car-nav-pills">
                                    <Nav.Item>
                                        <Nav.Link eventKey="all-car" className="car-tab-item">All Cars</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Sedan" className="car-tab-item">Sedan</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="SUV" className="car-tab-item">SUV/MUV</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="Traveller" className="car-tab-item">Traveller</Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                        </Col>
                    </Row>

                    <Tab.Content>
                        {/* We use one Tab.Pane but swap the content dynamically for better performance */}
                        <Tab.Pane eventKey={activeTab}>
                            {finalDisplayCars.length > 0 ? (
                                <Row className='g-4'>
                                    {finalDisplayCars.map((value, index) => (
                                        <Col key={index} lg={4} md={6}>
                                            <RentalCarCard car={value} onBook={() => handleOpenBooking(value.name)} />
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <div className="text-center py-5">
                                    <h4 className="text-muted">No {activeTab === "all-car" ? "" : activeTab} cars available in this search.</h4>
                                </div>
                            )}
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>

                <BookingForm
                    show={show}
                    handleClose={() => setShow(false)}
                    type="car"
                    selectedItem={selectedCar}
                />
            </Container>
        </section>
    );
}

export default function RentalCar() {
    return (
        <main>
            <Suspense fallback={<div className="section-padding text-center">Loading Fleet...</div>}>
                {/* Hero Section */}
                <section className="hero-rental-section section-padding">
                    <Container>
                        <Row className="align-items-center gy-5">
                            <Col lg={6} className="hero-content">
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

                            <Col lg={6} className="hero-image-wrapper">
                                <div className="main-image-container">
                                    <Image
                                        src="/images/car-page-img-1.png"
                                        alt="Luxury sedan for Kumbh Mela"
                                        width={600}
                                        height={400}
                                        className="img-fluid hero-img"
                                        priority
                                    />
                                    <div className="support-card shadow-lg">
                                        <div className="support-number">24/7</div>
                                        <div className="support-text">Driver Support</div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Filter Section */}
                <section className="filter-section section-padding pt-0">
                    <Container>
                        <div className="search-fleet-wrapper">
                            <SearchFleet />
                        </div>
                    </Container>
                </section>

                {/* card section */}
                <RentalCarContent />

                {/* bento grid */}
                <section className="bento-features-section section-padding">
                    <Container>
                        <TitleComponent
                            title="The Pilgrim's Standard"
                            description=""
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


// const RentalCarContent = () => {
//     const [show, setShow] = useState(false);
//     const [selectedCar, setSelectedCar] = useState("");
//     const router = useRouter();
//     const searchParams = useSearchParams();

//     // Filters from URL
//     const nameFilter = searchParams.get("name");
//     const categoryFilter = searchParams.get("category");
//     const priceFilter = searchParams.get("price");

//     /* --- Pagination logic commented out as requested ---
//     const currentPage = Number(searchParams.get("page")) || 1;
//     const itemsPerPage = 6;
//     */

//     const handleOpenBooking = (carName) => {
//         setSelectedCar(carName);
//         setShow(true);
//     };

//     // Filter Logic
//     const filteredCars = rentalCar.filter((car) => {
//         const matchesName = nameFilter ? car.name.toLowerCase().includes(nameFilter.toLowerCase()) : true;
//         const matchesCat = categoryFilter && categoryFilter !== 'all' ? car.type === categoryFilter : true;

//         let matchesPrice = true;
//         if (priceFilter && priceFilter !== 'all') {
//             const [min, max] = priceFilter.split("-").map(Number);
//             matchesPrice = car.price >= min && car.price <= max;
//         }
//         return matchesName && matchesCat && matchesPrice;
//     });

//     /* --- Pagination slicing commented out - showing all filtered results instead --- */
//     // const totalPages = Math.ceil(filteredCars.length / itemsPerPage);
//     // const currentItems = filteredCars.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
//     const currentItems = filteredCars;

//     /* --- Page change handler commented out ---
//     const handlePageChange = (pageNum) => {
//         if (pageNum < 1 || pageNum > totalPages) return;
//         const params = new URLSearchParams(searchParams);
//         params.set("page", pageNum);
//         router.push(`/rental-car?${params.toString()}`);
//     };
//     */

//     return (
//         <section className="section-padding">
//             <Container>
//                 <Tab.Container defaultActiveKey="all-car">
//                     <Row className="align-items-center mb-5">
//                         <Col md={8}>
//                             <TitleComponent
//                                 className='text-start mb-0'
//                                 title="Select your preferred transport"
//                                 description="Our Collections"
//                                 divider={false}
//                             />
//                         </Col>
//                         <Col md={4} className="mt-4 mt-md-0">
//                             <Nav variant="pills" className="justify-content-md-between gap-2">
//                                 <Nav.Item>
//                                     <Nav.Link eventKey="all-car" className="car-tab-item shadow-sm">
//                                         All Cars
//                                     </Nav.Link>
//                                 </Nav.Item>
//                             </Nav>
//                         </Col>
//                     </Row>

//                     <Tab.Content>
//                         <Tab.Pane eventKey="all-car">
//                             {currentItems.length > 0 ? (
//                                 <Row className='g-4'>
//                                     {currentItems.map((value, index) => (
//                                         <Col key={index} lg={4} md={6}>
//                                             <RentalCarCard car={value} onBook={() => handleOpenBooking(value.name)} />
//                                         </Col>
//                                     ))}
//                                 </Row>
//                             ) : (
//                                 <div className="text-center py-5">
//                                     <h4>No cars found matching your search.</h4>
//                                 </div>
//                             )}
//                         </Tab.Pane>
//                     </Tab.Content>
//                 </Tab.Container>

//                 {/* --- Pagination UI Block Commented Out ---
//                 {totalPages > 1 && (
//                     <div className="d-flex justify-content-center align-items-center gap-3 mt-5">
//                         <button 
//                             className={`pagination-item arrow ${currentPage === 1 ? 'disabled' : ''}`}
//                             onClick={() => handlePageChange(currentPage - 1)}
//                             disabled={currentPage === 1}
//                         >
//                             <ChevronLeft size={20} />
//                         </button>
//                         <div className="d-flex gap-2">
//                             {[...Array(totalPages)].map((_, i) => (
//                                 <button
//                                     key={i}
//                                     className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
//                                     onClick={() => handlePageChange(i + 1)}
//                                 >
//                                     {i + 1}
//                                 </button>
//                             ))}
//                         </div>
//                         <button 
//                             className={`pagination-item arrow ${currentPage === totalPages ? 'disabled' : ''}`}
//                             onClick={() => handlePageChange(currentPage + 1)}
//                             disabled={currentPage === totalPages}
//                         >
//                             <ChevronRight size={20} />
//                         </button>
//                     </div>
//                 )}
//                 */}

//                 <CarBookingForm show={show} handleClose={() => setShow(false)} selectedCar={selectedCar} />
//             </Container>
//         </section>
//     );
// }

{/* <Row className='g-4 mb-5'>
    {currentItems.length > 0 ? (
        currentItems.map((value, index) => (
            <Col key={index} lg={4} md={6}>
                <RentalCarCard car={value} onBook={() => handleOpenBooking(value.name)} />
            </Col>
        ))
    ) : (
        <Col className="text-center py-5">
            <div className="text-center py-5">
                <h3>No packages found matching your criteria.</h3>
                <button
                    className="primery-btn py-3"
                    onClick={() => router.push('/rental-car')}
                >
                    Clear All Filters
                </button>
            </div>
        </Col>
    )}
</Row> */}