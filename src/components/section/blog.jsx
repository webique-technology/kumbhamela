"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import "../../styles/blog.scss"
import { Col, Container, Row } from "react-bootstrap";
// import { blogs } from "@/lib/blog";
import { SwiperSliderComp, TitleComponent } from "../ui/common";
import { BlogCard } from "../ui/card";
import { PrimeryBtn } from "../ui/button";
import { slugify } from "@/lib/utils";
import { SwiperSlide } from "swiper/react";
import { getBlogs } from '@/app/[locale]/blog/blogApi';
import { useTranslations } from "next-intl";

const BlogSection = () => {
    const t = useTranslations('BlogSection');
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const recentBlogs = blogs;
    // 1. Sort blogs by date (Most Recent first)
    // We create a copy with [...] so we don't change the original array
    // const recentBlogs = [...blogs]
    //     .sort((a, b) => new Date(b.date) - new Date(a.date))
    //     .slice(0, 3); // 2. Take only the top 3

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {

            setLoading(true);

            const response = await getBlogs(
                1,
                "",
                3
            );

            setBlogs(response || []);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="blog-section" className="section-padding bg-light position-relative">
            <Container>
                {/* Heading */}
                <div className="d-flex mb-3 mb-md-4 mb-lg-5 justify-content-center justify-content-sm-between align-items-center">
                    <TitleComponent
                        title={t("mainTitle")} // Dynamic translation mapping passed cleanly
                        className="m-0 text-center text-sm-start title-width"
                        divider={false}
                        montezSubTitle={t("montezSubTitle")} // Dynamic subtitle mapping passed cleanly
                        montezClass="playfair-display primery-color d-none d-md-block"
                    />
                    <div className="d-none d-sm-flex justify-content-center">
                        <PrimeryBtn
                            className="primery-btn"
                            title={t("viewAll")} // Dynamic CTA button label mapping passed cleanly
                            btnLink="/blog"
                            iconRight={<ArrowRight size={18} />}
                        />
                    </div>
                </div>

                {/* Blog Grid */}
                <div className="d-none d-lg-block">
                    <Row className="g-4 mb-4">
                        {recentBlogs.map((blog, index) => (
                            // 3. col-lg-4 ensures 3 cards per row on large screens
                            <Col md={6} lg={4} key={index}>
                                <BlogCard
                                    blog={blog}
                                    // Ensure you are using slug for the link
                                    // blogLink={`/blog/${slugify(blog.blogTitle)}`}
                                    blogLink={`/blog/${slugify(blog.title)}`}
                                    img_width={300}
                                    img_height={220}
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
                
                {/* blog card swiper */}
                <div className="d-lg-none mb-4">
                    <SwiperSliderComp
                        spaceBetween={20}
                        breakpoints={{
                            0: {
                                slidesPerView: 1.25,
                            },
                            576: {
                                slidesPerView: 2,
                            },
                        }}
                        navigation={false}
                        disableAutoplay={true}
                    >
                        {recentBlogs.map((blog, index) => (
                            <SwiperSlide key={index} className="h-auto">
                                <BlogCard
                                    blog={blog}
                                    // Ensure you are using slug for the link
                                    // blogLink={`/blog/${slugify(blog.blogTitle)}`}
                                    blogLink={`/blog/${slugify(blog.title)}`}
                                    img_width={300}
                                    img_height={220}
                                />
                            </SwiperSlide>
                        ))}
                    </SwiperSliderComp>
                </div>

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