"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SEOHead from "@/components/seo-head";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import {
  Cloud,
  Server,
  Shield,
  Database,
  BarChart,
  GitBranch,
} from "lucide-react";
import Footer from "@/components/sections/footer";
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

const CloudMigrationPage = () => {
  const [seoDetais, setSeoDetails] = useState<SEOData[]>([]);
  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, []);

  const getData = async () => {
    const json = { type: "GET_SEO_DETAILS", serviceName: "cloud-migration" };
    const data = await getSeoFromLambda(json);
    console.log("data", data.data.body.bodymsg);
    setSeoDetails(data.data.body.bodymsg ?? []);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cloud Migration Services",
    description:
      seoDetais[0]?.metaDescription ||
      "HADS provides seamless cloud migration services with expert consulting to help businesses transform their digital infrastructure. Migrate to AWS, Azure, and GCP with minimal downtime and maximum business value.",
    provider: {
      "@type": "Organization",
      name: "HADS TechNovations LLP",
      url: "https://www.hadstechnovations.com/",
      logo: "https://www.hadstechnovations.com/images/hads-logo.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-800-HADS-TECH",
        contactType: "customer service",
      },
    },
    serviceType: "Cloud Migration",
    areaServed: {
      "@type": "Country",
      name: "Global",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      description: "Free consultation for cloud migration assessment",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      lastReviewed: "2024-01-15",
      "@id": "https://www.hadstechnovations.com/services/cloud-migration",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "247",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cloud Migration Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AWS Migration",
            description: "Complete migration to Amazon Web Services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Azure Migration",
            description: "Microsoft Azure cloud migration services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Google Cloud Migration",
            description: "GCP migration with AI/ML optimization",
          },
        },
      ],
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <SEOHead
        title={
          seoDetais[0]?.metaTitle ||
          "Cloud Migration Services | AWS, Azure, GCP Migration | HADS TechNovations"
        }
        description={
          seoDetais[0]?.metaDescription ||
          "Seamlessly migrate your business to the cloud with HADS expert consulting. Our comprehensive cloud migration services ensure minimal disruption with maximum business value. Get strategic planning, execution, and post-migration support from certified AWS, Azure, and GCP professionals."
        }
        keywords={
          seoDetais[0]?.keywords?.filter(k => k.trim() !== "").join(",") ||
          "cloud migration, AWS migration, Azure migration, GCP migration, cloud consulting, digital transformation, cloud strategy, infrastructure migration, application migration, database migration, hybrid cloud, multi-cloud, cloud assessment, migration planning"
        }
        ogUrl={seoDetais[0]?.canonicalTag || "/services/cloud-migration"}
        schema={structuredData}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="flex-grow pt-20">
        <HeroSection />
        <StrategyOverview />
        <FocusAreasSection />
        <CloudPlatformsSection />
        <MigrationProcessSection />
      </main>
      <Footer />
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="mt-[10px] min-h-[50px] flex items-center justify-center py-12">
      <div className="container px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8 max-w-7xl mx-auto">
        {/* Image section */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <Image
              src="/images/servicesimages/cloud-migration-consulting.jpg"
              alt="Cloud migration and consulting services - HADS TechNovations professional cloud transformation"
              width={500}
              height={400}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
        {/* Text section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left mt-6 md:mt-0">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            <span className="text-black">Cloud </span>
            <span className="text-hads-pink">Migration</span>
            <span className="text-black"> and </span>
            <br className="hidden sm:block" />
            <span className="text-hads-pink">Consulting</span>
            <span className="text-black">...</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed mt-4 sm:mt-6 text-gray-700">
            HADS - Cloud Solutions
            <br />
            Seamless Cloud Migration, Expert Consulting
            <br />
            We help you move to the cloud with zero disruption. Our experts
            assess, plan, and execute a migration strategy tailored to your
            business goals.
          </p>
        </div>
      </div>
    </section>
  );
};

const StrategyOverview = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });

  return (
    <section ref={sectionRef} className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className={cn(
              "text-2xl md:text-3xl lg:text-4xl font-bold text-hads-dark mb-6 transition-all duration-700 transform",
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <span className="text-gray-800">Strategic </span>
            <span className="text-hads-pink">Migration</span>
            <span className="text-gray-800"> to Cloud</span>
          </h2>
          <p
            className={cn(
              "text-base md:text-lg text-gray-700 leading-relaxed transition-all duration-700 delay-100 transform",
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            Cloud migration isn't just about shifting infrastructure—it's about
            aligning your technology with your business goals. At HADS, we take
            a business-first approach, delivering tailored AWS strategies backed
            by risk assessment, ROI analysis, and future-ready architecture. Our
            end-to-end framework ensures secure, scalable, and seamless
            migrations that drive long-term value and innovation.
          </p>
        </div>
      </div>
    </section>
  );
};

const FocusAreasSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  const focusAreas = [
    {
      title: "Strategic Planning & Assessment",
      description:
        "Evaluate existing infrastructure and define a clear migration roadmap aligned with your business goals.",
      icon: <Cloud className="h-6 w-6 md:h-8 md:w-8 text-hads-pink" />,
      delay: 0,
    },
    {
      title: "Minimal Downtime Execution",
      description:
        "Ensure seamless, low-risk migration with minimal disruption to operations.",
      icon: <Server className="h-6 w-6 md:h-8 md:w-8 text-hads-pink" />,
      delay: 100,
    },
    {
      title: "Modern Architecture Design",
      description:
        "Adopt scalable, resilient AWS-based architectures optimized for performance and growth.",
      icon: <Shield className="h-6 w-6 md:h-8 md:w-8 text-hads-pink" />,
      delay: 200,
    },
    {
      title: "Security Integration",
      description:
        "Embed security best practices and compliance controls throughout the migration process.",
      icon: <Database className="h-6 w-6 md:h-8 md:w-8 text-hads-pink" />,
      delay: 300,
    },
    {
      title: "Resource Optimization",
      description:
        "Right-size cloud resources and implement cost-control strategies to drive efficiency.",
      icon: <BarChart className="h-6 w-6 md:h-8 md:w-8 text-hads-pink" />,
      delay: 400,
    },
    {
      title: "DevOps Enablement",
      description:
        "Establish CI/CD pipelines and infrastructure as code (IaC) for faster, more reliable deployments.",
      icon: <GitBranch className="h-6 w-6 md:h-8 md:w-8 text-hads-pink" />,
      delay: 500,
    },
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2
            className={cn(
              "text-2xl md:text-3xl lg:text-4xl font-bold text-hads-dark mb-6 transition-all duration-700 transform",
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <span className="text-gray-800">Key </span>
            <span className="text-hads-pink">Focus</span>
            <span className="text-gray-800"> Areas</span>
          </h2>
          <p
            className={cn(
              "text-base md:text-lg text-gray-700 max-w-3xl mx-auto transition-all duration-700 delay-100 transform",
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            Our comprehensive approach targets six critical areas to ensure a
            successful cloud migration
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {focusAreas.map((area, index) => (
            <div
              key={index}
              className={cn(
                "bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 transition-all duration-700 transform hover:shadow-lg hover:-translate-y-1",
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${area.delay}ms` }}
            >
              <div className="rounded-full bg-hads-pink/10 h-12 w-12 md:h-16 md:w-16 flex items-center justify-center mb-6">
                {area.icon}
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-hads-dark mb-3">
                {area.title}
              </h3>
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CloudPlatformsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });

  const platforms = [
    {
      name: "AWS",
      description:
        "Preferred for its comprehensive suite of cloud services and scalability, offering 200+ fully featured services from data centers globally.",
      strengths: [
        "Industry-leading service portfolio",
        "Global and highly available infrastructure",
        "Mature ecosystem and marketplace",
        "Advanced security and compliance features",
      ],
      color: "#FF9900",
      delay: 0,
      icon: "☁️",
    },
    {
      name: "Google Cloud",
      description:
        "An alternative for AI/ML-driven applications and cost-effective solutions, with strong data analytics and machine learning capabilities.",
      strengths: [
        "Strong in big data and analytics",
        "Advanced AI/ML capabilities",
        "Competitive pricing model",
        "Global network infrastructure",
      ],
      color: "#4285F4",
      delay: 200,
      icon: "🌐",
    },
    {
      name: "Microsoft Azure",
      description:
        "Ideal for enterprises requiring deep integration with Microsoft services, providing seamless connectivity with existing Microsoft ecosystems.",
      strengths: [
        "Microsoft ecosystem integration",
        "Hybrid cloud capabilities",
        "Enterprise compliance features",
        "Comprehensive identity management",
      ],
      color: "#0078D4",
      delay: 400,
      icon: "⚡",
    },
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Title Section */}
        <div className="text-center mb-10 md:mb-16 lg:mb-20">
          <h2
            className={cn(
              "text-2xl md:text-3xl lg:text-4xl font-bold mb-6 transition-all duration-700 transform",
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <span className="text-gray-800">Target </span>
            <span className="text-hads-pink">Cloud</span>
            <span className="text-gray-800"> Platforms</span>
          </h2>
          <p
            className={cn(
              "text-base md:text-lg max-w-3xl mx-auto text-gray-700 transition-all duration-700 delay-100 transform",
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            We support migration to multiple cloud platforms, each offering
            unique advantages for different business needs
          </p>
        </div>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 max-w-6xl mx-auto">
          {platforms.map((platform, index) => (
            <div
              key={index}
              className={cn(
                "rounded-lg md:rounded-2xl p-6 md:p-8 border transition-all bg-white shadow-md hover:shadow-lg h-full transform hover:-translate-y-1 duration-300",
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
              style={{
                transitionDelay: `${platform.delay}ms`,
                borderTop: `5px solid ${platform.color}`,
              }}
            >
              {/* Header Section */}
              <div className="flex items-center mb-4">
                <div
                  className="h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg"
                  style={{ backgroundColor: platform.color }}
                >
                  {platform.icon}
                </div>
                <h3
                  className="text-lg md:text-xl font-bold ml-4"
                  style={{ color: platform.color }}
                >
                  {platform.name}
                </h3>
              </div>
              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">
                {platform.description}
              </p>
              {/* Key Strengths */}
              <h4 className="text-base md:text-lg font-semibold text-gray-800 mb-3">
                Key Strengths:
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {platform.strengths.map((strength, i) => (
                  <li key={i} className="flex items-start">
                    <div
                      className="flex-shrink-0 h-5 w-5 md:h-6 md:w-6 rounded-full flex items-center justify-center mt-1 shadow"
                      style={{
                        backgroundColor: `${platform.color}20`,
                      }}
                    >
                      <span
                        className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full"
                        style={{ backgroundColor: platform.color }}
                      ></span>
                    </div>
                    <p className="ml-3 text-gray-700 leading-snug text-sm md:text-base">
                      {strength}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MigrationProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });

  const steps = [
    {
      number: "01",
      title: "Assessment",
      description:
        "Evaluate current infrastructure, applications, and dependencies to identify migration candidates and challenges. Identify dependencies, risks, and cost implications.",
      delay: 0,
    },
    {
      number: "02",
      title: "Planning",
      description:
        "Develop a detailed migration strategy with timelines, resource requirements, and risk mitigation plans.",
      delay: 100,
    },
    {
      number: "03",
      title: "Design",
      description:
        "Choose the right AWS architecture based on scalability, performance, and resilience. Integrate security, compliance, and automation best practices. Design for high availability and disaster recovery.",
      delay: 200,
    },
    {
      number: "04",
      title: "Migration",
      description:
        "Execute the migration plan with minimal disruption to business operations, following established best practices.",
      delay: 300,
    },
    {
      number: "05",
      title: "Optimization",
      description:
        "Conduct rigorous post-migration testing for performance and functionality. Fine-tune resources to ensure optimal cost, scalability, and efficiency. Implement monitoring and alerting systems.",
      delay: 400,
    },
    {
      number: "06",
      title: "Management",
      description:
        "Continuous performance monitoring and troubleshooting. Security patching, updates, and compliance audits. Ongoing infrastructure management and optimization.",
      delay: 500,
    },
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-16">
          <h2
            className={cn(
              "text-2xl md:text-3xl lg:text-4xl font-bold text-hads-dark mb-6 transition-all duration-700 transform",
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            <span className="text-gray-800">Migration </span>
            <span className="text-hads-pink">Process</span>
          </h2>
          <p
            className={cn(
              "text-base md:text-lg text-gray-700 max-w-3xl mx-auto transition-all duration-700 delay-100 transform",
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            )}
          >
            Our structured migration methodology ensures a smooth transition to
            the cloud
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "bg-gradient-to-r from-hads-purple to-hads-pink rounded-xl p-6 md:p-8 shadow-lg h-full transition-all duration-700 transform hover:scale-105",
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              )}
              style={{ transitionDelay: `${step.delay}ms` }}
            >
              <div className="flex items-start mb-4">
                <span className="text-2xl md:text-3xl font-bold text-white opacity-70">
                  {step.number}
                </span>
                <h3 className="text-lg md:text-xl font-semibold text-white ml-3 mt-1">
                  {step.title}
                </h3>
              </div>
              <p className="text-white text-sm md:text-base leading-relaxed opacity-90">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CloudMigrationPage;
