import React from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
// import { slugify } from "@/lib/utils";
import { notFound } from "next/navigation";
import { BookingFormHandler } from "../../../../../components/ui/bookingFormHandler";
import { getTourBySlug } from "../../tourApi";
import {
  CheckCircle2,
  CalendarDays,
  Sparkles,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

async function getTours() {
  try {
    const response = await axios.get(
      `${API_URL}/tours`
    );

    return response.data?.data?.data || [];
  } catch (error) {
    console.error(
      "Tour API Error:",
      error.response?.data ||
      error.message
    );

    return [];
  }
}


async function getVehicleCategories(id) {
  try {
    const response = await axios.get(
      `${API_URL}/tours/${id}/vehicle-categories`
    );
    return response.data || [];
  } catch (error) {
    console.error(
      "Vehicle category API error:",
      error.response?.data ||
      error.message
    );

    return [];
  }
}

const BookingPage = async ({
  params,
}) => {
  const { slug ,locale  } = await params;
  const tour = await getTourBySlug(slug ,locale );
  // const tours =
  //   await getTours();

  // const tour = tours.find(
  //   (item) =>
  //     slugify(item.title || "") ===
  //     slug
  // );

  if (!tour) {
    notFound();
  }

  const vehicleCategories =
    await getVehicleCategories(
      tour.id
    );

  return (
    <main>
      <section className="section-padding padding-bottom booking-form-page min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">

            {/* form */}
            <Col
              lg={8}
              className="text-white p-3 pt-0 d-flex flex-column"
            >
              <div className="form-header mb-4">
                <h1 className="display-5 fw-bold primery-color">
                  Book Your Sacred Path
                </h1>

                <p className="text-dark mb-1">
                  Fill in the details below to begin your pilgrimage. Our journey coordinators will contact you within 24 hours to personalize your experience.
                </p>
              </div>

              <BookingFormHandler
                tourId={tour.id}
                tourName={tour.title}
                vehicleCategories={vehicleCategories}
              />
            </Col>

            {/* sidebar */}
            <Col
              lg={4}
              className="p-2 p-md-3"
            >
              <div
                className="sidebar-cards sticky-top z-3 d-flex flex-column gap-4"
                style={{
                  top: "110px",
                }}
              >
                <div className="info-card p-4 rounded-4 shadow-sm">
                  <h4 className="fw-bold mb-4">
                    Why Book With Us
                  </h4>

                  <div className="d-flex flex-column gap-4">

                    <div className="d-flex gap-3">
                      <div className="icon-circle p-2 bg-warning-light rounded-3 h-fit">
                        <CheckCircle2
                          className="text-warning"
                          size={20}
                        />
                      </div>

                      <div>
                        <h6 className="fw-bold mb-1">
                          Verified Local
                          Guides
                        </h6>
                        <p className="small text-muted mb-0">Guided by Nashik scholars who know the hidden stories of every Ghat.</p>
                      </div>
                    </div>

                    <div className="d-flex gap-3">
                      <div className="icon-circle p-2 bg-warning-light rounded-3 h-fit">
                        <CalendarDays
                          className="text-warning"
                          size={20}
                        />
                      </div>

                      <div>
                        <h6 className="fw-bold mb-1">
                          Guaranteed
                          Access
                        </h6>

                        <p className="small text-muted mb-0">Priority slots for restricted ritual areas and VIP viewing platforms.</p>
                      </div>
                    </div>

                    <div className="d-flex gap-3">
                      <div className="icon-circle p-2 bg-warning-light rounded-3 h-fit">
                        <Sparkles
                          className="text-warning"
                          size={20}
                        />
                      </div>

                      <div>
                        <h6 className="fw-bold mb-1">
                          Spiritual
                          Concierge
                        </h6>
                        <p className="small text-muted mb-0">From Samagri arrangements to personalized Puja planning.</p>
                      </div>
                    </div>

                  </div>

                  <hr className="my-4 opacity-10" />
                  <div className="d-flex justify-content-between text-center">
                    <div><h5 className="fw-bold mb-0">15k+</h5><small className="text-muted smaller">PILGRIMS</small></div>
                    <div><h5 className="fw-bold mb-0">4.9/5</h5><small className="text-muted smaller">RATING</small></div>
                    <div><h5 className="fw-bold mb-0">24/7</h5><small className="text-muted smaller">SUPPORT</small></div>
                  </div>
                </div>
              </div>
            </Col>

          </Row>
        </Container>
      </section>
    </main>
  );
};

export default BookingPage;