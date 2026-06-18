import React from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
// import { slugify } from "@/lib/utils";
import { notFound } from "next/navigation";
import { BookingFormHandler } from "../../../../../components/ui/bookingFormHandler";
import { getTranslations } from "next-intl/server";
import { CheckCircle2, CalendarDays, Sparkles } from "lucide-react";
import { getTourBySlug } from "../../tourApi";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function getTours() {
  try {
    const response = await axios.get(`${API_URL}/tours`);
    return response.data?.data?.data || [];
  } catch (error) {
    console.error("Tour API Error:", error.response?.data || error.message);
    return [];
  }
}

async function getVehicleCategories(id) {
  try {
    const response = await axios.get(`${API_URL}/tours/${id}/vehicle-categories`);
    return response.data || [];
  } catch (error) {
    console.error("Vehicle category API error:", error.response?.data || error.message);
    return [];
  }
}

const BookingPage = async ({ params }) => {
  const { slug, locale } = await params;
  const tour = await getTourBySlug(slug ,locale );
  // Load server-side dictionary instance targeting specific namespace tokens
  const t = await getTranslations({ locale, namespace: "BookingFormPage" });

  const tours = await getTours();
  // const tour = tours.find((item) => slugify(item.title || "") === slug);

  if (!tour) {
    notFound();
  }

  const vehicleCategories = await getVehicleCategories(tour.id);

  return (
    <main>
      <section className="section-padding padding-bottom booking-form-page min-vh-100 d-flex align-items-center">
        <Container>
          <Row className="justify-content-center">

            {/* Localized Booking Submission Form Core Column */}
            <Col lg={8} className="text-white p-3 pt-0 d-flex flex-column">
              <div className="form-header mb-4">
                <h1 className="display-5 fw-bold primery-color">
                  {t("Header.title")}
                </h1>
                <p className="text-dark mb-1">
                  {t("Header.description")}
                </p>
              </div>

              <BookingFormHandler
                tourId={tour.id}
                tourName={tour.title}
                vehicleCategories={vehicleCategories}
              />
            </Col>

            {/* Localized Proof Badges Sidebar Layout */}
            <Col lg={4} className="p-2 p-md-3">
              <div
                className="sidebar-cards sticky-top z-3 d-flex flex-column gap-4"
                style={{ top: "110px" }}
              >
                <div className="info-card p-4 rounded-4 shadow-sm">
                  <h4 className="fw-bold mb-4">
                    {t("Sidebar.title")}
                  </h4>

                  <div className="d-flex flex-column gap-4">
                    {/* Badge feature 1 */}
                    <div className="d-flex gap-3">
                      <div className="icon-circle p-2 bg-warning-light rounded-3 h-fit">
                        <CheckCircle2 className="text-warning" size={20} />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">{t("Sidebar.feat1.title")}</h6>
                        <p className="small text-muted mb-0">{t("Sidebar.feat1.text")}</p>
                      </div>
                    </div>

                    {/* Badge feature 2 */}
                    <div className="d-flex gap-3">
                      <div className="icon-circle p-2 bg-warning-light rounded-3 h-fit">
                        <CalendarDays className="text-warning" size={20} />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">{t("Sidebar.feat2.title")}</h6>
                        <p className="small text-muted mb-0">{t("Sidebar.feat2.text")}</p>
                      </div>
                    </div>

                    {/* Badge feature 3 */}
                    <div className="d-flex gap-3">
                      <div className="icon-circle p-2 bg-warning-light rounded-3 h-fit">
                        <Sparkles className="text-warning" size={20} />
                      </div>
                      <div>
                        <h6 className="fw-bold mb-1">{t("Sidebar.feat3.title")}</h6>
                        <p className="small text-muted mb-0">{t("Sidebar.feat3.text")}</p>
                      </div>
                    </div>
                  </div>

                  <hr className="my-4 opacity-10" />

                  {/* Trust Stats Indicators Grid Layout */}
                  <div className="d-flex justify-content-between text-center">
                    <div>
                      <h5 className="fw-bold mb-0">15k+</h5>
                      <small className="text-uppercase text-muted smaller">{t("Sidebar.stats.pilgrims")}</small>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-0">4.9/5</h5>
                      <small className="text-uppercase text-muted smaller">{t("Sidebar.stats.rating")}</small>
                    </div>
                    <div>
                      <h5 className="fw-bold mb-0">24/7</h5>
                      <small className="text-uppercase text-muted smaller">{t("Sidebar.stats.support")}</small>
                    </div>
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