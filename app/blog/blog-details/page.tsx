"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { User, Calendar, ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  Variants,
} from "framer-motion";

const BlogDetails = () => {
  const [blog, setBlog] = useState<any>(null);
  const [y, setY] = useState<MotionValue<string> | null>(null);
  const [imageError, setImageError] = useState(false);
  const headerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const data = sessionStorage.getItem("selectedBlog");
    if (data) {
      const parsedBlog = JSON.parse(data);
      setBlog(parsedBlog);
      // Show slug in URL if available
      if (parsedBlog?.slug) {
        window.history.replaceState({}, '', `/${parsedBlog.slug}`);
      }
    } else {
      router.push("/blog");
    }
  }, [router]);

  useEffect(() => {
    if (headerRef.current) {
      const { scrollYProgress } = useScroll({
        target: headerRef,
        offset: ["start start", "end start"],
      });
      const transform = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
      setY(transform);
    }
  }, []);

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const handleImageError = () => {
    setImageError(true);
  };
  if (!blog)
    return (
      <p className="text-[#111111] text-center mt-20 text-sm">Loading...</p>
    );

  return (
    <div className="min-h-screen bg-[#f9f9f9] mt-14">
      <main className="relative">
        <section className="bg-white text-[#111111] px-4 py-10">
          {/* Back Link */}
          <div className="flex items-center gap-2 mb-6">
            <ArrowRight className="w-4 h-4 rotate-180 text-hads-purple" />
            <Link
              href="/blog"
              className="bg-gradient-to-r from-hads-purple to-hads-pink text-white rounded-full px-6 py-2 text-sm font-semibold shadow-md hover:scale-105 hover:shadow-xl transition-transform"
            >
              Back to Blogs
            </Link>
          </div>

          {/* Title Section */}
          <div className="text-center mb-10" ref={headerRef}>
            <motion.h1
              style={{ y: y || "0%" }}
              className="text-lg sm:text-xl md:text-2xl font-bold text-royal-gold"
            >
              {blog.title}
            </motion.h1>

            <div className="flex flex-wrap justify-center gap-3 mt-2 text-royal-purple-200 text-[10px] sm:text-xs">
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-royal-gold" />
                <span>By {blog.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-royal-gold" />
                <span>{blog.publishedAt}</span>
              </div>
            </div>
          </div>

          {/* Image First, Content Below */}
          <div className="max-w-screen-lg mx-auto flex flex-col gap-8 items-start">
            {/* Blog Image */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="w-full transition-transform duration-300 ease-in-out hover:scale-[1.03] hover:shadow-xl"
            >
              {!imageError ? (
                <Image
                  src={blog.imageLink || blog.imageUrl || "/placeholder.svg"}
                  alt={blog.imageAltText || "Blog image"}
                  width={1200}
                  height={600}
                  className="rounded-lg w-full h-[400px] object-cover shadow-md"
                  priority
                  onError={handleImageError}
                  unoptimized={true}
                />
              ) : (
                <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Image not available</span>
                </div>
              )}
            </motion.div>

            {/* Blog Content */}
            <motion.div
              variants={contentVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="prose max-w-none text-sm leading-relaxed w-full
             prose-headings:text-[#1a1a1a] 
             prose-headings:text-base 
             prose-a:text-blue-700 
             hover:prose-a:text-blue-900 
             prose-strong:text-[#222222] 
             prose-li:marker:text-blue-600"
            >
              <h2 className="text-sm sm:text-base font-medium text-royal-purple-900 mb-3">
                {(blog.title || "").toUpperCase()}
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: blog.content
                    // ✅ Extract and render images from "image:URL" pattern (MEDIUM SIZE + CENTERED)
                    ?.replace(
                      /<p>image:\s*(https?:\/\/[^<]+?)<\/p>/gi,
                      (match, url) => {
                        // Decode HTML entities (&amp; -> &)
                        const decodedUrl = url
                          .replace(/&amp;/g, '&')
                          .replace(/&lt;/g, '<')
                          .replace(/&gt;/g, '>')
                          .replace(/&quot;/g, '"')
                          .replace(/&#39;/g, "'");

                        return `<img src="${decodedUrl}" alt="Blog Image" style="max-width: 500px; width: 100%; height: auto; border-radius: 8px; margin: 1rem auto; display: block;" class="shadow-md" />`;
                      }
                    )
                    .replace(/<p>(#{1,6})\s+(.+?)<\/p>/g, (match, hashes, text) => {
                      const level = hashes.length;
                      const sizes = ['2rem', '1.75rem', '1.5rem', '1.25rem', '1.125rem', '1rem'];
                      return `<h${level} style="font-size: ${sizes[level - 1]}; font-weight: 600; margin: 0.75rem 0;">${text}</h${level}>`;
                    })
                    // ✅ Bold text (**text**)
                    .replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight: 600;">$1</strong>')
                    // ✅ Italic text (*text*)
                    .replace(/\*(.+?)\*/g, '<em style="font-style: italic;">$1</em>')
                    // ✅ Markdown links [text](url) within content
                    .replace(
                      /\[(.+?)\]\((.+?)\)/g,
                      '<a style="color: #2563eb; text-decoration: underline;" href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
                    )
                    // ✅ Clean up empty <p><br></p> tags (optional)
                    .replace(/<p><br><\/p>/g, '<br />'),
                }}
              />
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogDetails;
