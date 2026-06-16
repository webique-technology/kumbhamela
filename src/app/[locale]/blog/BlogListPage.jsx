"use client";

import React, { Suspense, useState, useEffect } from "react";
import { BlogCard, HeroHeaderCard2 } from "@/components/ui/card";
import { Col, Row, Container } from "react-bootstrap";
import { slugify } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl"; // Import for internationalization
import "../../../styles/blog.scss";
import { getBlogs } from "./blogApi";

const BlogPageContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const t = useTranslations("Blog"); // Hook to pull translations from the "Blog" namespace

    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [, setCurrentPageApi] = useState(1);

    const currentPage = Number(searchParams.get("page")) || 1;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                const response = await getBlogs(currentPage);
                setBlogs(response?.data || []);
                setTotalPages(response?.last_page || 1);
                setCurrentPageApi(response?.current_page || 1);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, [currentPage]);

    const handlePageChange = (pageNum) => {
        router.push({
            pathname: "/blog",
            query: { page: pageNum },
        });
    };

    if (loading) {
        return (
            <div className="text-center section-padding">
                {t("loading")}
            </div>
        );
    }

    return (
        <>
            <section>
                <HeroHeaderCard2
                    subTitle={t("heroSubTitle")}
                    heroTitle={t("heroTitle")}
                    description={t("heroDescription")}
                    showSearch={false}
                    heroTitleClass={"text-light"}
                />
            </section>
            <section className="section-padding padding-bottom bg-light blog-page">
                <Container>
                    {/* --- grid --- */}
                    <Row className="g-4 mb-5">
                        {blogs.map((blog, index) => {
                            let colSize = 4;
                            if (currentPage === 1) {
                                if (index === 0) colSize = 8;
                                if (index === 1) colSize = 4;
                            }

                            const isSpecialCard = currentPage === 1 && (index === 0 || index === 1);
                            const customHeight = isSpecialCard ? 420 : 220;

                            return (
                                <Col lg={colSize} md={6} key={index}>
                                    <BlogCard
                                        blog={blog}
                                        blogLink={`/blog/${slugify(blog.title)}`}
                                        img_width={100}
                                        img_height={420}
                                        img_count_width={"100%"}
                                        img_count_height={customHeight}
                                    />
                                </Col>
                            );
                        })}
                    </Row>

                    {/* --- dynamic pagination --- */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center align-items-center pagination-wrapper gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={`pagination-item arrow ${currentPage === 1 ? "disabled" : ""}`}
                                disabled={currentPage === 1}
                                aria-label={t("previousPage")}
                            >
                                <ChevronLeft size={18} />
                            </button>

                            {/* page numbers */}
                            {[...Array(totalPages)].map((_, i) => {
                                const pageNum = i + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`pagination-number shadow-sm border number ${currentPage === pageNum ? "active" : ""}`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            {/* right arrow */}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={`pagination-item arrow ${currentPage === totalPages ? "disabled" : ""}`}
                                disabled={currentPage === totalPages}
                                aria-label={t("nextPage")}
                            >
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </Container>
            </section>
        </>
    );
};

const BlogPageList = () => {
    const t = useTranslations("Blog");
    return (
        <main>
            <Suspense fallback={<div className="text-center section-padding">{t("loading")}</div>}>
                <BlogPageContent />
            </Suspense>
        </main>
    );
};

export default BlogPageList;