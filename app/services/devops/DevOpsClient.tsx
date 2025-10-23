"use client";

import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/sections/footer";
import { ArrowRight, Code, GitBranch, RefreshCw } from "lucide-react";
import SEOHead from "@/components/seo-head";
import { getSeoFromLambda } from "@/app/api/seoApi";
import { useEffect, useState } from "react";

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

const DevOpsClient = () => {
  const [seoDetais, setSeoDetails] = useState<SEOData[]>([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const json = { type: "GET_SEO_DETAILS", serviceName: "devops-automation"};
    const data = await getSeoFromLambda(json);
    setSeoDetails(data?.data.body.bodymsg ?? []);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "DevOps Automation Services",
    description:
      seoDetais[0]?.metaDescription ||
      "HADS provides DevOps automation services to accelerate development workflows, improve reliability, and enable continuous delivery.",
    provider: {
      "@type": "Organization",
      name: "HADS Technovations LLP",
      url: "https://www.hadstechnovations.com/",
    },
    serviceType: "DevOps",
    areaServed: {
      "@type": "Country",
      name: "Global",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      lastReviewed: "2023-10-05",
      "@id": "https://www.hadstechnovations.com/services/devops",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.7",
      reviewCount: "118",
    },
    isRelatedTo: [
      {
        "@type": "Service",
        name: "Cloud Migration Services",
        url: "https://www.hadstechnovations.com/services/cloud-migration",
      },
      {
        "@type": "Service",
        name: "Cloud Managed Services",
        url: "https://www.hadstechnovations.com/services/managed-services",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden pt-5">
      <SEOHead
        title={
          seoDetais[0]?.metaTitle ||
          "DevOps Automation & CI/CD Implementation Services | HADS Technovations LLP"
        }
        description={
          seoDetais[0]?.metaDescription ||
          "Accelerate your development lifecycle with our comprehensive DevOps automation services. Implement CI/CD pipelines, infrastructure as code, container orchestration, and monitoring solutions for faster, more reliable software delivery. Our expert team helps organizations reduce deployment times by 70% and increase release frequency by 3x through DevOps best practices."
        }
        keywords={
          seoDetais[0]?.keywords?.filter(k => k.trim() !== "").join(",") || 
          "devops automation, CI/CD, continuous integration, continuous delivery"
        }
        ogUrl={seoDetais[0]?.canonicalTag || "/services/devops"}
        schema={schema}
      />
      <Navbar />
      <main className="flex-grow pt-5">
        {/* Hero Section */}
        <section>
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center min-h-[80vh] py-12">
              {/* Image Column */}
              <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
                <div className="max-w-[350px] md:max-w-[500px]">
                  <img
                    src="/images/servicesimages/devops-automation.jpg"
                    alt="DevOps automation illustration"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              {/* Text Column */}
              <div className="w-full md:w-1/2 md:pl-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-pink-600">DevOps</span>
                  <span className="mx-3">Automation</span>
                  <span className="mx-2">...</span>
                </h1>
                <div className="space-y-6">
                  <p className="text-lg md:text-xl">
                    DevOps Automation - Accelerating Cloud Efficiency
                  </p>
                  <p className="text-base md:text-lg">
                    DevOps automation makes development and operations faster
                    and more reliable. It reduces manual work by using CI/CD
                    pipelines, so your team can focus on building new things.
                    Our solutions help you work efficiently, launch faster,
                    scale easily, and save costs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto mb-10 md:mb-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                <span className="text-gray-800">
                  Accelerate Your Development
                </span>
                <span className="mx-2 text-pink-600">Lifecycle</span>
                <span className="text-gray-800">with DevOps</span>
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                Our DevOps services unite development and operations teams to
                deliver software faster, more reliably, and with improved
                quality.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                  <Code className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">
                  CI/CD Implementation
                </h3>
                <p className="text-sm md:text-base text-gray-700">
                  Automate your application deployment process with continuous
                  integration and delivery pipelines for smoother, quicker
                  releases.
                </p>
              </div>
              <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 mb-4 rounded-full bg-teal-100 flex items-center justify-center">
                  <GitBranch className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">
                  Infrastructure as Code
                </h3>
                <p className="text-sm md:text-base text-gray-700">
                  Achieve consistency, version control, and automation by
                  managing your infrastructure through code.
                </p>
              </div>
              <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 mb-4 rounded-full bg-pink-100 flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">
                  Monitoring & Observability
                </h3>
                <p className="text-sm md:text-base text-gray-700">
                  Gain real-time visibility into your applications with
                  comprehensive monitoring solutions, ensuring performance and
                  uptime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DevOps Transformation */}
        <section className="py-5 md:py-5 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto mb-10 md:mb-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                <span className="text-gray-800">DevOps </span>
                <span className="text-pink-600">Transformation</span>
                <span className="text-gray-800"> Journey</span>
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                We guide your organization through every stage of the DevOps
                transformation process, ensuring a smooth and successful
                transition.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-5xl mx-auto relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 via-teal-600 to-pink-600 transform -translate-y-1/2 z-0"></div>
              {/* For mobile: vertical timeline */}
              <div className="md:hidden absolute top-0 bottom-0 left-6 w-1 bg-gradient-to-b from-purple-600 via-teal-600 to-pink-600 h-full z-0"></div>
              {/* Timeline steps */}
              {[
                {
                  number: "1",
                  title: "Assessment",
                  desc: "Evaluate existing processes and pinpoint areas for improvement",
                },
                {
                  number: "2",
                  title: "Planning",
                  desc: "Develop a tailored roadmap and strategy to drive transformation",
                },
                {
                  number: "3",
                  title: "Implementation",
                  desc: "Deploy the right tools and implement process changes for efficiency",
                },
                {
                  number: "4",
                  title: "Training",
                  desc: "Empower teams by upskilling them with modern DevOps methodologies",
                },
                {
                  number: "5",
                  title: "Optimization",
                  desc: "Continuously refine processes for ongoing improvements and growth",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm z-10 text-center relative"
                >
                  {/* Mobile timeline circle and line */}
                  <div className="md:hidden absolute -left-6 top-6 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  {/* Desktop timeline circle */}
                  <div className="hidden md:block w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-600 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-semibold mb-2 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-700">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-5 md:py-5 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            {/* Section Header */}
            <div className="max-w-3xl mx-auto mb-10 md:mb-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                <span className="text-pink-600">Benefits</span>
                <span className="text-gray-800"> of DevOps</span>
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                Unlock the full potential of your development lifecycle with
                DevOps practices
              </p>
            </div>
            {/* Benefit Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Faster Time to Market",
                  description:
                    "Speed up software delivery with automation and streamlined deployment processes",
                },
                {
                  title: "Enhanced Quality",
                  description:
                    "Improve application reliability through automated testing and consistent delivery practices",
                },
                {
                  title: "Increased Collaboration",
                  description:
                    "Foster better collaboration between development, operations, and business teams",
                },
                {
                  title: "Greater Scalability",
                  description:
                    "Handle increased workloads efficiently with automated, repeatable deployment processes",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-100"
                >
                  {/* Benefit Title with Icon */}
                  <h3 className="text-lg font-semibold mb-3 text-gray-900 flex items-center gap-2">
                    <ArrowRight className="h-5 w-5 md:h-6 md:w-6 text-teal-600 flex-shrink-0" />
                    {benefit.title}
                  </h3>
                  {/* Benefit Description */}
                  <p className="text-sm md:text-base text-gray-700">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DevOpsClient;
