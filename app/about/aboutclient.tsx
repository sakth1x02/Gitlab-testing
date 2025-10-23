"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/sections/footer";
import ScrollToTop from "@/components/ui/scroll-to-top";
import AboutSectionVisionMission from "@/components/sections/about-section-vision-mission";
import { useResponsive } from "@/components/responsive-context";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SEOHead from "@/components/seo-head";
import { getSeoFromLambda } from "@/app/api/seoApi";

interface SEOData {
  id: string;
  serviceName: string;
  metaTitle: string;
  metaDescription: string;
  urlSlug: string;
  h1: string;
  h2: string[];
  h3: string[];
  h4: string[];
  h5: string[];
  h6: string[];
  keywords: string[];
  canonicalTag: string;
  imageAltText: string;
  imageTitle: string;
  contentInsertURL: string;
  faqSection: { question: string; answer: string }[];
  createdAt: string;
  updatedAt: string;
  type: string;
  isactive: boolean;
}

const AboutPage = () => {
  const { isMobile } = useResponsive();
  const [seoDetails, setSeoDetails] = useState<SEOData[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await getSeoFromLambda({ type: "GET_SEO_DETAILS", serviceName: "about" });
    setSeoDetails(res?.data.body.bodymsg ?? []);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About HADS TechNovations LLP",
    description:
      "HADS is a leading provider of AWS cloud migration, consulting, and managed services. Learn about our mission, vision, and company story.",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.hadstechnovations.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "HADS TechNovations LLP",
      logo: {
        "@type": "ImageObject",
        url: "https://www.hadstechnovations.com/logo.png",
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEOHead
        title={
          seoDetails[0]?.metaTitle || "About HADS | AWS Partner & Cloud Solutions Provider"
        }
        description={
          seoDetails[0]?.metaDescription ||
          "HADS TechNovations LLP is a leading AWS partner specializing in cloud migration, DevOps automation, and managed services."
        }
        keywords={
          seoDetails[0]?.keywords?.filter((k) => k.trim() !== "").join(", ") ||
          "cloud solutions company, AWS partner, cloud migration experts"
        }
        ogUrl={seoDetails[0]?.canonicalTag || "/about"}
        schema={schema}
      />

      <Navbar />
      <main className="flex-grow pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative py-6 sm:py-8 md:py-10 lg:py-20 bg-gradient-to-r from-hads-dark via-hads-purple to-hads-dark overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-hads-dark via-hads-purple to-hads-dark opacity-70" />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:20px_20px]" />
          </div>
          <div className="container relative z-10 mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
              <div className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0">
                <h1 className="text-4xl lg:text-6xl font-bold text-white mb-5 tracking-wider">
                  <span className="mx-1">About</span>
                  <span className="mx-1 text-hads-pink">HADS..</span>
                </h1>
                <p className="text-lg lg:text-2xl text-gray-300 mb-3 font-light leading-relaxed">
                  Transforming Your Business with Advanced Cloud Solutions
                </p>
                <p className="text-sm lg:text-lg text-gray-400">
                  At HADS TechNovations LLP, we help improve your business with cloud technology, offering solutions
                  for cloud migration and continuous support tailored to your needs.
                </p>
              </div>
              <div className="w-full md:w-1/2 h-[300px] xl:h-[400px]">
                <DotLottieReact
                  src="https://lottie.host/cc30454d-2fb4-4026-a6cb-447d8de24ce9/Z1d4REGQqD.lottie"
                  loop
                  autoplay
                  style={{ width: "100%", height: "100%" }}
                  aria-label="Cloud technology animation"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-5 bg-white shadow-md rounded-lg mx-4 mt-6">
          <div className="container mx-auto px-3">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                <span className="text-gray-800">Our </span>
                <span className="text-hads-pink">Company</span>
              </h2>
              <p className="text-base lg:text-lg text-gray-700 mb-5">
                HADS is a leading provider of cloud solutions, specializing in AWS cloud migration, consulting, and
                managed services. As an AWS partner, we help businesses transition to the cloud and optimize infrastructure
                for scalability, security, and cost efficiency.
              </p>
              <p className="text-base lg:text-lg text-gray-700">
                With expertise in over 50 AWS services including EC2, RDS, S3, Lambda, Kubernetes, AI/ML, CloudWatch,
                and more, we help businesses innovate and scale successfully.
              </p>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="py-5 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                <span className="text-gray-800">Our </span>
                <span className="text-hads-pink">Mission</span>
                <span className="mx-1 text-gray-800">&</span>
                <span className="text-hads-pink">Vision</span>
              </h2>
              <p className="text-base lg:text-lg text-gray-700">
                Our mission is to help organizations unlock the full potential of cloud technology, enabling rapid innovation,
                efficient operations, and confident scaling. We provide secure, cutting-edge solutions that drive transformation.
              </p>
            </div>
            <AboutSectionVisionMission />
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default AboutPage;
