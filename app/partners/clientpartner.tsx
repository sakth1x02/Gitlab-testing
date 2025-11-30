"use client"

import { ArrowRight, Building, Globe, ShieldCheck } from "lucide-react"
import { useEffect, useState } from "react";
import PartnersSection from "@/components/sections/partners-section"
import Footer from "@/components/sections/footer"
import { useResponsive } from "@/components/responsive-context"
import SEOHead from "@/components/seo-head"
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
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


const PartnersPage = () => {

  const { isMobile } = useResponsive()
  const [seoDetais, setSeoDetails] = useState<SEOData[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const json = { type: "GET_SEO_DETAILS", serviceName: "partners" };
    const data = await getSeoFromLambda(json);
    setSeoDetails(data?.data.body.bodymsg ?? []);
  };
  const logos = [
    { src: "/images/Freshworks.png", name: "Freshworks" },
    { src: "https://cdn.worldvectorlogo.com/logos/github-icon-1.svg", name: "GitHub" },
    { src: "https://cdn.worldvectorlogo.com/logos/gitlab.svg", name: "GitLab" },
    { src: "https://cdn.worldvectorlogo.com/logos/git-icon.svg", name: "Git" },
    { src: "https://cdn.worldvectorlogo.com/logos/grafana.svg", name: "Grafana" },
    { src: "https://cdn.worldvectorlogo.com/logos/prometheus.svg", name: "Prometheus" },
  ]

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "HADS Partners",
    description:
      "Explore HADS TechNovations LLP's strategic partnerships with industry leaders in cloud technology and solutions.",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://www.hadstechnovations.com/partners",
    },
    publisher: {
      "@type": "Organization",
      name: "HADS TechNovations LLP",
      logo: {
        "@type": "ImageObject",
        url: "https://www.hadstechnovations.com/logo.png",
      },
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SEOHead
        title={
          seoDetais[0]?.metaTitle ||
          "Our Partners | HADS TechNovations - Cloud Solutions Provider"
        }
        description={
          seoDetais[0]?.metaDescription ||
          "Discover HADS TechNovations' strategic partnerships with leading technology providers including AWS, Google Cloud, and Azure to deliver exceptional cloud solutions."
        }
        keywords={
          seoDetais[0]?.keywords?.filter(k => k.trim() !== "").join(",") ||
          "technology partners, cloud partners, AWS partner, Azure partner, Google Cloud partner"
        }
        ogUrl={seoDetais[0]?.canonicalTag || "/partners"}
        schema={schema}

      />

      {/* Flip Card Styles */}
      <style jsx>{`
        .flip-card {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }
        .flip-card:hover .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 1rem;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <main className="flex-grow pt-16 md:pt-20">
        {/* Hero Section */}
        <section className="relative py-8 sm:py-10 md:py-12 lg:py-20 bg-gradient-to-r from-hads-dark via-hads-purple to-hads-dark overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-hads-dark via-hads-purple to-hads-dark opacity-70"></div>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-grid-white/[0.2] bg-[length:20px_20px]"></div>
          </div>
          <div className="container relative z-10 mx-auto px-4 py-10">
            <div className="flex flex-wrap items-center justify-between max-w-7xl mx-auto">
              {/* Text Section */}
              <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0 px-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-wider leading-tight">
                  <span className="block sm:inline mx-1 md:mx-2">Our</span>
                  <span className="block sm:inline mx-1 md:mx-2 text-hads-pink">Strategic</span>
                  <span className="block sm:inline mx-1 md:mx-2">Partners..</span>
                </h1>

                <div className="mx-1 md:mx-2">
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-3 font-light leading-relaxed">
                    Driving digital transformation with cloud-first solutions.
                  </p>
                  <p className="text-sm sm:text-base md:text-lg text-gray-400">
                    At HADS TechNovation LLP, we team up with global leaders to co-create innovative cloud services. Our
                    partnerships deliver scalable, secure, and future-ready infrastructures, tailored to meet your
                    business needs.
                  </p>
                </div>
              </div>

              {/* Animation Section */}
              <div className="w-full md:w-1/2 px-4">
                <div className="w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]">
                  <DotLottieReact
                    src="https://lottie.host/01cc4ff0-3df0-4a83-9425-be324c883795/bF91MiY1Pg.lottie"
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                    aria-label="Cloud technology animation"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <PartnersSection />

        {/* Why Partner With Us */}
        <section className="py-8 sm:py-10 md:py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-6 md:mb-12 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-6">
                Why Partner With HADS? Unlock <span className="text-hads-pink">Growth</span> &{" "}
                <span className="text-hads-pink">Innovation</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4">
                Join our partner ecosystem and access unmatched opportunities for growth. At HADS, we empower partners
                with cutting-edge cloud-native solutions and deep technical expertise. From cloud migration and DevOps
                automation to application modernization, we provide end-to-end support led by AWS-certified
                professionals.
                {!isMobile &&
                  " Accelerate your time-to-market with scalable microservices, CI/CD pipelines, IaC, and real-time monitoring via CloudWatch, Prometheus, and Grafana. Whether you're optimizing efficiency, integrating AI/ML, or enabling secure multi-cloud environments, HADS ensures precision and performance."}
                Partner with us and stay ahead in the fast-evolving tech landscape!
              </p>
            </div>

            {/* Flip Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
              {/* Flip Card 1 */}
              <div className="flip-card h-56 sm:h-64 md:h-80 mb-4 md:mb-0">
                <div className="flip-card-inner">
                  <div className="flip-card-front bg-gradient-to-r from-hads-purple to-hads-pink shadow-md p-4 md:p-8 flex flex-col items-center justify-center border border-gray-100">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-3 md:mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <Building className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-white">
                      Industry Expertise
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-white text-center">
                      Unlock specialized knowledge and resources across leading cloud platforms.
                    </p>
                  </div>
                  <div className="flip-card-back bg-gradient-to-r from-hads-purple to-hads-teal text-white p-4 md:p-8 flex flex-col items-center justify-center">
                    <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 mb-2 text-white" />
                    <p className="text-xs md:text-sm text-center">
                      At HADS, we bring deep industry expertise to help you navigate and leverage the best cloud
                      solutions. With our insights and experience, you'll gain a competitive edge in today's
                      cloud-driven world.
                    </p>
                  </div>
                </div>
              </div>

              {/* Flip Card 2 */}
              <div className="flip-card h-56 sm:h-64 md:h-80 mb-4 md:mb-0">
                <div className="flip-card-inner">
                  <div className="flip-card-front bg-gradient-to-r from-hads-purple to-hads-pink shadow-md p-4 md:p-8 flex flex-col items-center justify-center border border-gray-100">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-3 md:mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <Globe className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-white">Global Reach</h3>
                    <p className="text-xs sm:text-sm md:text-base text-white text-center">
                      Expand your market presence with our global network and diverse clientele.
                    </p>
                  </div>
                  <div className="flip-card-back bg-gradient-to-r from-hads-purple to-hads-teal text-white p-4 md:p-8 flex flex-col items-center justify-center">
                    <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 mb-2 text-white" />
                    <p className="text-xs md:text-sm text-center">
                      Leverage HADS' international connections to grow your business, tap into new markets, and build
                      relationships with clients worldwide. Let us help you scale beyond borders.
                    </p>
                  </div>
                </div>
              </div>

              {/* Flip Card 3 */}
              <div className="flip-card h-56 sm:h-64 md:h-80 mb-4 md:mb-0">
                <div className="flip-card-inner">
                  <div className="flip-card-front bg-gradient-to-r from-hads-purple to-hads-pink shadow-md p-4 md:p-8 flex flex-col items-center justify-center border border-gray-100">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-3 md:mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-white">Innovation Focus</h3>
                    <p className="text-xs sm:text-sm md:text-base text-white text-center">
                      Stay ahead of the curve with early access to cutting-edge cloud technologies and solutions.
                    </p>
                  </div>
                  <div className="flip-card-back bg-gradient-to-r from-hads-purple to-hads-teal text-white p-4 md:p-8 flex flex-col items-center justify-center">
                    <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 mb-2 text-white" />
                    <p className="text-xs md:text-sm text-center">
                      At HADS, we keep you at the forefront of innovation, providing exclusive access to the latest
                      advancements in cloud technology, so you can lead, not follow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Logos */}
        <section className="py-8 sm:py-10 md:py-12 bg-gray-50 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto mb-6 md:mb-12 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
                Our Technology<span className="mx-2 text-hads-pink">Ecosystem</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-700">
                We collaborate with industry-leading platforms to deliver scalable cloud solutions.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 md:gap-8">
              {logos.map((logo, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center w-[110px] sm:w-[140px] md:w-[200px] p-3 sm:p-4 md:p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all"
                >
                  <img
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.name}
                    className="h-8 sm:h-10 md:h-14 object-contain"
                  />
                  <p className="text-xs md:text-sm font-medium text-gray-700 mt-2 text-center">{logo.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default PartnersPage

