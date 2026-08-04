// import { blogs } from "@/lib/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import { slugify } from "@/lib/utils";
import "../../../../styles/blog.scss";
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react";
import { PrimeryBtn } from "@/components/ui/button";
import { getBlogs, getBlogBySlug } from "../blogApi";
import { Link } from "@/i18n/routing";
import { decode } from "html-entities";
import { CommonTranslatedText } from "@/components/ui/common";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://yourkumbhdomain.com";

export async function generateMetadata({ params }) {
  const { slug, locale } = await params;
  const blog = await getBlogBySlug(slug, locale);

  const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://mahakumbhtourtravelsnashik.com";

  if (!blog) {
    return {
      title: "Blog Post Not Found | Mahakumbh Tours",
    };
  }

  // 1. Decode HTML entities (converts &#2325; -> कु)
  // 2. Strip HTML tags (<p>, <br>, etc.)
  // 3. Collapse whitespace and safely slice clean text
  const rawDesc = decode(blog.description || "");
  const cleanDescription = rawDesc
    .replace(/<[^>]+>/g, "") // Strip HTML tags
    .replace(/\s+/g, " ") // Normalize spaces/newlines
    .trim()
    .slice(0, 160); // Safe slice after decoding!

  const fullUrl = `${BASE_URL}/${locale}/blog/${slug}`;

  return {
    title: `${blog.title} | Blogs & Insights`,
    description: cleanDescription,

    other: {
      "og:logo": `${BASE_URL}/images/logo.png`,
    },

    alternates: {
      canonical: fullUrl,
      languages: {
        "en-IN": `${BASE_URL}/en/blog/${slug}`,
        "hi-IN": `${BASE_URL}/hi/blog/${slug}`,
        "mr-IN": `${BASE_URL}/mr/blog/${slug}`,
      },
    },

    openGraph: {
      title: blog.title,
      description: cleanDescription,
      url: fullUrl,
      siteName: "Mahakumbh Tours & Travels",
      type: "article",
      locale: locale === "en" ? "en_IN" : `${locale}_IN`,
      images: [
        {
          url: blog.image_url || `${BASE_URL}/images/default-blog-og.jpg`,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: cleanDescription,
      images: [blog.image_url || `${BASE_URL}/images/default-blog-og.jpg`],
    },
  };
}

const BlogDetails = async ({ params }) => {
  // const locale = params.locale;
  const { slug, locale } = await params;
  // const blogs = await getBlogs();
  const response = await getBlogs(1, "", "", locale);
  const blogs = response.data || [];
  const blog = await getBlogBySlug(slug, locale);
  // const blog = blogs.find(
  //     (item) => slugify(item.title) === slug
  // );
  if (!blog) {
    notFound();
  }
  return (
    <main>
      <article className="padding-bottom bg-light">
        {/* blog bg image and sm more than 576px screen heading */}
        <div
          className="blog-detailed-bg-img d-flex flex-column justify-content-between"
          style={{ backgroundImage: `url(${blog.image_url})` }}
        >
          <Container className="pt-4">
            <div className="w-max">
              <Link
                href="/blog"
                className="border position-relative btn primery-btn d-flex align-items-center gap-2 p-1 px-2 rounded-pill"
              >
                <ArrowLeft size={15} />
                <p className="m-0">
                  <CommonTranslatedText text={"BackToBlog"} />
                </p>
              </Link>
            </div>
          </Container>
          <Container className="z-3">
            <div className="d-none d-sm-flex flex-column mb-4 align-items-start">
              <span className="badge sora primary-badge mb-2 text-uppercase">
                {blog.category}
              </span>
              <h1 className="display-4 fw-bold blog-detail-page-title">
                {blog.title}
              </h1>
              <div className=" d-flex align-items-center gap-3">
                <p className="mb-0 d-flex align-items-center gap-2">
                  <Calendar size={14} />{" "}
                  {new Date(blog.created_at).toLocaleDateString()}
                </p>
                {/* {blog.readTime && (
                                    <p className="mb-0 d-flex align-items-center gap-2">
                                        <Clock size={14} /> {blog.readTime}
                                    </p>
                                )} */}
              </div>
            </div>
          </Container>
        </div>
        {/* blog content section */}
        <Container>
          <Row className="justify-content-center mt-4 mt-md-5">
            {/* blog page content    */}
            <Col lg={8}>
              <div className="blog-content">
                {/* blob sm less than 576px screen heading */}
                <div className="d-flex d-sm-none flex-column align-items-start">
                  <span className="badge bg-primary mb-2 text-uppercase">
                    {blog.category}
                  </span>
                  <p className="text-muted">
                    {blog.date} {blog.readTime && `• ${blog.readTime}`}
                  </p>
                  <h1 className="display-6 fw-bold">{blog.title}</h1>
                </div>
                {/* blog content */}
                {/* <p className="lead fw-medium mb-4">
                                    {blog.description}
                                </p> */}
                <div className="blog-description lead fw-medium mb-4">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: blog.description,
                    }}
                  />
                </div>
              </div>
            </Col>
            {/* blog page sidebar */}
            <Col lg={4}>
              <div
                className="blog-sidebar sticky-top mb-5 mb-md-0 z-3 p-4 rounded bg-white border d-flex flex-column gap-3"
                style={{ top: "110px" }}
              >
                {/* recent post */}
                <div className="blog-sidebar-widget">
                  <h3 className="blog-sidebar-widget-title pb-2 border-bottom">
                    <CommonTranslatedText text={"ReadMore"} />
                  </h3>
                  <div className="blog-sidebar-widget-content d-flex flex-column gap-3">
                    {blogs.slice(0, 3).map((blog, index) => (
                      <div
                        className="blog-sidebar-widget-item d-flex gap-3 bg-light p-2 rounded-3 shadow-sm"
                        key={index}
                      >
                        <div className="blog-sidebar-widget-item-img">
                          <img
                            src={blog.image_url}
                            alt={blog.title}
                            width={100}
                            height={100}
                          />
                        </div>
                        <div className="blog-sidebar-widget-item-content">
                          {/* <a href={`/blog/${slugify(blog.title)}`} className="blog-sidebar-widget-item-link text-decoration-none">
                                                        <h4 className="blog-sidebar-widget-item-title">{blog.title}</h4>
                                                    </a> */}
                          <Link
                            // href={`/blog/${slugify(blog.title)}`}
                            href={`/blog/${blog.slug}`}
                            locale={locale}
                            className="blog-sidebar-widget-item-link text-decoration-none"
                          >
                            <h4 className="blog-sidebar-widget-item-title">
                              {blog.title}
                            </h4>
                          </Link>
                          <p className="blog-sidebar-widget-item-date m-0">
                            {blog.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </article>
    </main>
  );
};

export default BlogDetails;
