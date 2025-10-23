"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SEOHead from "@/components/seo-head";
import { Calendar, User, ArrowRight, Clock } from "lucide-react";
import { client } from "@/lib/sanity-client";
import { getAllBlogsQuery } from "@/lib/queries";
import type { Blog, BlogPost1 } from "@/types/blog";
import Footer from "@/components/sections/footer";
import { useResponsive } from "@/components/responsive-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSeoFromLambda } from "@/app/api/seoApi";
// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation";

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [seoDetais, setSeoDetails] = useState<BlogPost1[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const json = { type: "GET_BLOG_SEO_DETAILS", serviceName: "Blog" };
    const data = await getSeoFromLambda(json);
    console.log("data", data.data.body.bodymsg.seo_data);
    if (data.data.body.statuscode == 200) {
      setBlogs(data.data.body.bodymsg?.image_data ?? []);
      setSeoDetails(data.data.body.bodymsg?.seo_data ?? []);
    } else {
      setBlogs([]);
      setSeoDetails([]);
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Schema.org structured data for the blog page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "HADS TechNovations Blog",
    description:
      seoDetais[0]?.metaDescription ||
      "Latest insights on cloud migration, DevOps automation, security best practices, and digital transformation from HADS experts. Stay ahead in cloud technology with expert articles, tutorials, and success stories.",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.hadstechnovations.com/blog",
    },
    publisher: {
      "@type": "Organization",
      name: "HADS TechNovations LLP",
      url: "https://www.hadstechnovations.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.hadstechnovations.com/images/hads-logo.png",
        width: 200,
        height: 60,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-800-HADS-TECH",
        contactType: "customer service",
      },
    },
    author: {
      "@type": "Organization",
      name: "HADS TechNovations LLP",
    },
    inLanguage: "en-US",
    copyrightYear: "2024",
    copyrightHolder: {
      "@type": "Organization",
      name: "HADS TechNovations LLP",
    },
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.excerpt,
      url: `https://www.hadstechnovations.com/blog/${blog.slug.current}`,
      datePublished: blog.publishedAt,
      author: {
        "@type": "Person",
        name: blog.author || "HADS Team",
      },
      publisher: {
        "@type": "Organization",
        name: "HADS TechNovations LLP",
      },
      image:
        blog.mainImage ||
        "https://www.hadstechnovations.com/images/blog-default.jpg",
    })),
  };
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEOHead
        title={
          seoDetais[0]?.metaTitle ||
          "Cloud Technology Blog | Expert Insights & Tutorials | HADS TechNovations"
        }
        description={
          seoDetais[0]?.metaDescription ||
          "Stay ahead in the cloud game with expert articles, tutorials, and success stories on cloud migration, DevOps automation, security best practices, and digital transformation from HADS professionals. Your go-to knowledge hub for cloud technology insights."
        }
        keywords={
          seoDetais[0]?.keywords?.filter((k) => k.trim() !== "").join(",") ||
          "cloud blog, DevOps tutorials, cloud migration guides, AWS best practices, Azure tutorials, GCP insights, cloud security, technology insights, digital transformation, cloud computing, infrastructure as code, containerization, kubernetes, microservices, serverless computing"
        }
        ogUrl="/blog"
        schema={structuredData}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="mt-10 flex-grow pt-10">
        {/* Hero Section */}
        <section className="py-8 md:py-12">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center min-h-[60vh] md:min-h-[80vh] py-12">
              {/* Image Column */}
              <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
                <div className="max-w-[350px] md:max-w-[500px]">
                  <Image
                    src="/images/insightsimages/blog.jpg"
                    alt="Cloud technology blog insights and expert tutorials - HADS TechNovations knowledge hub"
                    width={500}
                    height={400}
                    className="w-full h-auto object-contain rounded-lg"
                    priority
                  />
                </div>
              </div>

              {/* Text Column */}
              <div className="w-full md:w-1/2 md:pl-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Latest <span className="mx-2 text-hads-pink">Blog</span>
                  Insights
                </h1>
                <p className="text-lg md:text-xl mb-6 text-gray-700 leading-relaxed">
                  Stay ahead in the cloud game with our handpicked articles,
                  expert opinions, how-to tutorials, and real-world success
                  stories from HADS professionals. Whether you're a startup or
                  an enterprise, our blog is your go-to knowledge hub.
                </p>
                <p className="text-md md:text-lg text-gray-600">
                  Explore insights on <strong>cloud migration</strong>,{" "}
                  <strong>cost optimization</strong>,{" "}
                  <strong>DevOps automation</strong>,{" "}
                  <strong>security best practices</strong>, and more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section Header */}
        <section className="py-8 md:py-12 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center mb-8 md:mb-12">
              <div className="h-px w-12 bg-hads-pink mr-4"></div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-hads-dark">
                Read <span className="mx-2 text-hads-pink">Our Latest</span>
                Blogs
              </h2>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
                  >
                    <div className="h-48 bg-gray-300"></div>
                    <div className="p-6">
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded mb-4 w-1/2"></div>
                      <div className="flex justify-between items-center">
                        <div className="h-3 bg-gray-300 rounded w-1/4"></div>
                        <div className="h-8 bg-gray-300 rounded w-20"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-12">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">
                    Unable to Load Blogs
                  </h3>
                  <p className="text-red-600">{error}</p>
                  <Button
                    onClick={() => window.location.reload()}
                    className="mt-4 bg-hads-pink hover:bg-hads-pink/90"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {/* Blog Grid */}
            {!loading && !error && blogs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((BlogPost1) => (
                  <article
                    key={BlogPost1._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Blog Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={
                          BlogPost1.imageLink ||
                          BlogPost1.imageUrl ||
                          "https://www.hadstechnovations.com/placeholder.svg?height=200&width=400&query=blog post"
                        }
                        alt={BlogPost1.imageAltText || "HADS Blog Image"}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />

                      {BlogPost1.category && (
                        <Badge className="absolute top-3 left-3 bg-hads-pink text-white">
                          {BlogPost1.category}
                        </Badge>
                      )}
                    </div>

                    {/* Blog Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-hads-dark mb-3 line-clamp-2 hover:text-hads-pink transition-colors">
                        {/* <Link href={`/blog/${BlogPost1.slug}`}> */}
                        {BlogPost1.title}
                        {/* </Link> */}
                      </h3>

                      <div
                        className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed"
                        dangerouslySetInnerHTML={{
                          __html: BlogPost1.content
                            ?.replace(/<[^>]*>/g, '')  // First remove all HTML tags
                            .replace(/#{1,6}\s+(.*?)$/gm, (_, text) => `<h2 style="font-size: 1.5rem; font-weight: 600; margin: 0.75rem 0;">${text}</h2>`) // Convert markdown headings to styled h2
                            .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 600;">$1</strong>') // Bold text
                            .replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>') // Italic text
                            .replace(/\[(.*?)\]\((.*?)\)/g, '<a style="color: #2563eb; text-decoration: underline;" href="$2">$1</a>') // Links
                            .substring(0, 200) + '...'
                        }}
                      />

                      {/* Blog Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span>{BlogPost1.author || "HADS Team"}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(BlogPost1.publishedAt)}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          // Store the full blog data including content
                          sessionStorage.setItem(
                            "selectedBlog",
                            JSON.stringify({
                              ...BlogPost1,
                              content: BlogPost1.content
                            })
                          );
                          router.push("/blog/blog-details");
                        }}
                        className="inline-flex items-center text-hads-pink hover:text-hads-pink/80 font-medium transition-colors"
                      >
                        Read More
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && blogs.length === 0 && (
              <div className="text-center py-12">
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    No Blogs Available
                  </h3>
                  <p className="text-gray-600">
                    Check back soon for new content!
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
