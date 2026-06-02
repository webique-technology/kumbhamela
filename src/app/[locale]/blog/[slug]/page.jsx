// import { blogs } from "@/lib/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import { slugify } from "@/lib/utils";
import "../../../../styles/blog.scss";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { PrimeryBtn } from "@/components/ui/button";
import { getBlogs,getBlogBySlug } from "../blogApi";
import { Link } from "@/i18n/routing";

const BASE_URL =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://yourkumbhdomain.com";

// export const generateMetadata = async ({ params }) => {
//     const { slug } = await params;
//     const blog = blogs.find((b) => slugify(b.blogTitle) === slug);
//     return {
//         title: blog.blogTitle,
//         description: blog.description,
//         alternates: {
//             canonical: `${BASE_URL}/blog/${slugify(blog.blogTitle)}`,
//         },
//         openGraph: {
//             title: blog.blogTitle,
//             description: blog.description,
//             url: `${BASE_URL}/blog/${slugify(blog.blogTitle)}`,
//             siteName: "Kumbh Mela",
//             images: [
//                 {
//                     url: blog.image,
//                     width: 1200,
//                     height: 630,
//                 },
//             ],
//             locale: "en_US",
//             type: "article",
//         },
//         twitter: {
//             card: "summary_large_image",
//             title: blog.blogTitle,
//             description: blog.description,
//             images: [blog.image],
//         },
//     };
// };

// 1. Make the component async


export async function generateMetadata({ params }) {
    const { slug } = await params;
    // const blogs = await getBlogs();
    const response = await getBlogs();
    const blogs = response.data || [];
     const blog = await getBlogBySlug(slug);

    // const blog = blogs.find(
    //     (item) => slugify(item.title) === slug
    // );

    if (!blog) {
        return {};
    }

    return {
        title: blog.title,
        description:
        blog.description?.replace(/<[^>]+>/g, "").slice(0, 160),

        alternates: {
        canonical: `${BASE_URL}/blog/${slug}`,
        },

        openGraph: {
        title: blog.title,
        description:
            blog.description?.replace(/<[^>]+>/g, "").slice(0, 160),
        images: [blog.image_url],
        },
    };
}
const BlogDetails = async ({ params }) => {

    // const locale = params.locale;
    const { slug } = await params;
    // const blogs = await getBlogs();
    const response = await getBlogs();
    const blogs = response.data || [];
    console.log("Slug:", slug);
    const blog = await getBlogBySlug(slug);
    console.log("Blog Found:", blog);
    // const blog = blogs.find(
    //     (item) => slugify(item.title) === slug
    // );
    if (!blog) {
        notFound();
    }

    return (
        <main>
            <article className="pb-5 bg-white">
                {/* blog bg image and sm more than 576px screen heading */}
                <div className="blog-detailed-bg-img" style={{ backgroundImage: `url(${blog.image_url})` }}>
                    <Container className='z-3'>
                        <div className="d-none d-sm-flex flex-column mb-4 align-items-start">
                            <span className="badge bg-primary mb-2 text-uppercase">
                                {blog.category}
                            </span>
                            <h1 className="display-4 fw-bold blog-detail-page-title">{blog.title}</h1>
                            <div className=" d-flex align-items-center gap-3">
                                <p className="mb-0 d-flex align-items-center gap-2">
                                    <Calendar size={14} /> {new Date(blog.created_at).toLocaleDateString()}
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
                        <Col lg={9}>
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
                                {/* <div className="text-secondary"> */}
                                    {/* <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                        In publishing and graphic design, Lorem ipsum is a placeholder text
                                        commonly used to demonstrate the visual form of a document.
                                    </p> */}
                                    {/* Future content from Admin Panel can go here */}
                                {/* </div> */}
                            </div>
                        </Col>
                        {/* blog page sidebar */}
                        <Col lg={3}>
                            <div className="blog-sidebar d-flex flex-column gap-3">
                                {/* recent post */}
                                <div className="blog-sidebar-widget">
                                    <h3 className="blog-sidebar-widget-title">Related Blogs</h3>
                                    <div className="blog-sidebar-widget-content d-flex flex-column gap-3">
                                        {blogs.slice(0, 3).map((blog, index) => (
                                            <div className="blog-sidebar-widget-item d-flex gap-3" key={index}>
                                                <div className="blog-sidebar-widget-item-img">
                                                    <img src={blog.image_url} alt={blog.title} width={100} height={100} />
                                                </div>
                                                <div className="blog-sidebar-widget-item-content">
                                                    {/* <a href={`/blog/${slugify(blog.title)}`} className="blog-sidebar-widget-item-link text-decoration-none">
                                                        <h4 className="blog-sidebar-widget-item-title">{blog.title}</h4>
                                                    </a> */}
                                                    <Link
                                                        href={`/blog/${slugify(blog.title)}`}
                                                        className="blog-sidebar-widget-item-link text-decoration-none"
                                                        >
                                                        <h4 className="blog-sidebar-widget-item-title">
                                                            {blog.title}
                                                        </h4>
                                                        </Link>
                                                    <p className="blog-sidebar-widget-item-date m-0">{blog.created_at}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* news letter card */}
                                {/* <div className="news-letter-card d-flex flex-column gap-3 justify-content-center">
                                    <div>
                                        <h4 className="m-0">Stay Updated</h4>
                                        <p className="m-0">Get the latest updates and insights delivered straight to your inbox.</p>
                                    </div>
                                    <div className="d-flex flex-column gap-3">
                                        <PrimeryBtn
                                            className="primery-btn w-100 justify-content-center"
                                            title="Blogs"
                                            btnLink="/blog"
                                            iconRight={<ArrowRight size={18} />}
                                        />
                                        <PrimeryBtn
                                            className="primery-btn w-100 justify-content-center"
                                            title="View All Blogs"
                                            btnLink="/blog"
                                            iconRight={<ArrowRight size={18} />}
                                        />
                                    </div>
                                </div> */}

                                {/* treanding card */}
                                <div className="treanding-card d-flex flex-column gap-3 justify-content-center">
                                    <div>
                                        <h4 className="m-0">Treanding Nearby Places</h4>
                                        <p className="m-0">Get the latest updates and insights delivered straight to your inbox.</p>
                                    </div>
                                    <div className="d-flex flex-wrap gap-2">
                                        {["Kumbh 2024", "Trimbakeshwar", "Ramkund", "Kalaram Temple", "Panchvati", "Trirashmi Caves"].map((value, i) => {
                                            return (
                                                <div className="pill-btns d-flex align-items-center justify-content-center" key={i}>
                                                    <span className="m-0">{value}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </article>
        </main>
    );
}

export default BlogDetails;