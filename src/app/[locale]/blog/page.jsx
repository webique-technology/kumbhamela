// src/app/blog/page.jsx
"use client";

import React, { Suspense } from "react";
import { blogs } from "@/lib/blog";
import { BlogCard } from "@/components/ui/card";
import { Col, Row, Container, Pagination } from "react-bootstrap";
import { TitleComponent } from "@/components/ui/common";
import { slugify } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../../../styles/blog.scss";

const BlogPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- 1.get current page from url ---
  const currentPage = Number(searchParams.get("page")) || 1;

  // --- 2. sorting all blogs by date ---
  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalBlogs = sortedBlogs.length;

  // --- 3. pagination math & total pages ---
  const totalPages = Math.ceil((totalBlogs - 8) / 9) + 1;

  // --- 4. slicing logic ---
  let startIndex = 0;
  let endIndex = 8;

  if (currentPage > 1) {
    startIndex = 8 + (currentPage - 2) * 9;
    endIndex = startIndex + 9;
  }

  const currentBlogs = sortedBlogs.slice(startIndex, endIndex);

  // --- 5. routing function rout to the page numbers ---
  const handlePageChange = (pageNum) => {
    router.push(`/blog?page=${pageNum}`);
  };

  return (
    <section className="section-padding bg-light blog-page">
      <Container>
        <TitleComponent
          title="All Insights"
          description="Exploring the depths of Kumbh Mela"
        />

        {/* --- grid --- */}
        <Row className="g-4 mb-5">
          {currentBlogs.map((blog, index) => {
            // Layout Check: Ensure the col-8 logic only applies when currentPage === 1 AND index === 0.
            // 1. Grid Logic: Only Page 1 has a special 8-4 layout
            let colSize = 4;
            if (currentPage === 1) {
              if (index === 0) colSize = 8;
              if (index === 1) colSize = 4;
            }

            // 2. Height Logic: Only first two items of Page 1 get 420px
            const isSpecialCard = currentPage === 1 && (index === 0 || index === 1);
            const customHeight = isSpecialCard ? 420 : 220;

            return (
              <Col lg={colSize} md={6} key={index}>
                <BlogCard
                  blog={blog}
                  blogLink={`/blog/${slugify(blog.blogTitle)}`}
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
        {/* left arrow */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center align-items-center pagination-wrapper gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`pagination-item arrow ${currentPage === 1 ? 'disabled' : ''}`}
              disabled={currentPage === 1}
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
                  className={`pagination-number number ${currentPage === pageNum ? 'active' : ''}`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* right arrow */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`pagination-item arrow ${currentPage === totalPages ? 'disabled' : ''}`}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

const BlogPage = () => {
  return (
    <main>
      <Suspense fallback={<div className="text-center section-padding">Loading blogs...</div>}>
        <BlogPageContent />
      </Suspense>
    </main>
  );
};

export default BlogPage;