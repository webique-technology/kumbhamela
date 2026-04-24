"use client";
import { ArrowRight } from "lucide-react";
import "../../styles/blog.scss"
import { Col, Container, Row } from "react-bootstrap";
import { blogs } from "@/lib/blog";
import { TitleComponent } from "../ui/common";
import { BlogCard } from "../ui/card";
import { PrimeryBtn } from "../ui/button";
import { slugify } from "@/lib/utils";

const BlogSection = () => {
    // 1. Sort blogs by date (Most Recent first)
    // We create a copy with [...] so we don't change the original array
    const recentBlogs = [...blogs]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3); // 2. Take only the top 3

    return (
        <section id="blog-section" className="section-padding bg-light">
            <Container>
                {/* Heading */}
                <div className="d-flex mb-3 mb-md-4 mb-lg-5 justify-content-between justify-content-sm-between align-items-center">
                    <TitleComponent
                        title="Latest Updates & Insights"
                        // description="Stay Informed About Kumbh Mela"
                        className="m-0"
                        divider={false}
                        montezSubTitle="Bolgs & Updates"
                        montezClass="montez-sub-heading primery-color"
                    />
                    <div className="d-none d-sm-flex justify-content-center">
                        <PrimeryBtn
                            className="primery-btn"
                            title="View All Blogs"
                            btnLink="/blog"
                            iconRight={<ArrowRight size={18} />}
                        />
                    </div>
                </div>


                {/* Blog Grid */}
                <Row className="g-4 mb-4">
                    {recentBlogs.map((blog, index) => (
                        // 3. col-lg-4 ensures 3 cards per row on large screens
                        <Col md={6} lg={4} key={index}>
                            <BlogCard
                                blog={blog}
                                // Ensure you are using slug for the link
                                blogLink={`/blog/${slugify(blog.blogTitle)}`}
                                img_width={300}
                                img_height={220}
                            />
                        </Col>
                    ))}
                </Row>

                {/* View All Button */}
                <div className="d-flex d-sm-none justify-content-center">
                    <PrimeryBtn
                        className="primery-btn"
                        title="View All Blogs"
                        btnLink="/blog"
                        iconRight={<ArrowRight size={18} />}
                    />
                </div>
            </Container>
        </section>
    );
};

export default BlogSection;