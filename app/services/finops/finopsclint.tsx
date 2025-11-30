"use client";

import Navbar from "@/components/navigation/navbar";
import Footer from "@/components/sections/footer";
import { BarChart, DollarSign, TrendingDown } from "lucide-react";
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

const FinOpsPage = () => {
  const [seoDetais, setSeoDetails] = useState<SEOData[]>([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const json = { type: "GET_SEO_DETAILS", serviceName: "finops" };
    const data = await getSeoFromLambda(json);
    // console.log("data", data);
    setSeoDetails(data?.data.body.bodymsg ?? []);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cloud Cost Optimization (FinOps)",
    description:
      seoDetais[0]?.metaDescription ||
      "HADS provides FinOps services to align finance, engineering, and business teams to take control of cloud spending.",
    provider: {
      "@type": "Organization",
      name: "HADS Technovations LLP",
      url: "https://www.hadstechnovations.com/",
    },
    serviceType: "Cloud Cost Optimization",
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
      lastReviewed: "2023-09-15",
      "@id": "https://www.hadstechnovations.com/services/finops",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "87",
    },
    isRelatedTo: [
      {
        "@type": "Service",
        name: "Cloud Migration Services",
        url: "https://www.hadstechnovations.com/services/cloud-migration",
      },
      {
        "@type": "Service",
        name: "DevOps Automation",
        url: "https://www.hadstechnovations.com/services/devops",
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden pt-7">
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
                    src="/images/servicesimages/finops.png"
                    alt="Cloud cost optimization illustration"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              {/* Text Column */}
              <div className="w-full md:w-1/2 md:pl-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Cloud Cost Optimization{" "}
                  <span className="text-pink-600">Compliances</span>
                  <span className="mx-2 text-pink-600">...</span>
                </h1>
                <p className="text-lg md:text-xl mb-6">
                  FinOps aligns finance, engineering, and business teams to take
                  control of cloud spending. It enables cost visibility, smarter
                  budgeting, and continuous optimization. From rightsizing
                  resources to eliminating waste, FinOps maximizes cloud value.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto mb-10 md:mb-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                <span className="text-gray-800">Why Choose </span>
                <span className="text-pink-600">FinOps</span>
                <span className="text-gray-800">?</span>
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                FinOps brings clarity, control, and accountability to your cloud
                expenses. Align teams, optimize resources, and track every
                dollar.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                  <BarChart className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">
                  Cost Visibility
                </h3>
                <p className="text-sm md:text-base text-gray-700">
                  Gain full transparency into cloud spend with real-time
                  dashboards and detailed reports for smarter decision-making.
                </p>
              </div>
              <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 mb-4 rounded-full bg-teal-100 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">
                  Smart Optimization
                </h3>
                <p className="text-sm md:text-base text-gray-700">
                  Reduce waste and cut costs by identifying unused resources and
                  implementing right-sized infrastructure.
                </p>
              </div>
              <div className="bg-gray-50 p-6 md:p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 mb-4 rounded-full bg-pink-100 flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900">
                  Cost Governance
                </h3>
                <p className="text-sm md:text-base text-gray-700">
                  Establish policies, budgets, and alerts to control cloud
                  usage, prevent overspending, and ensure financial
                  accountability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Section */}
        <section className="py-5 md:py-5 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-3xl mx-auto mb-10 md:mb-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                <span className="text-pink-600">Results</span>
                <span className="text-gray-800"> You Can Measure</span>
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                Our FinOps approach delivers tangible business impact with real,
                trackable savings.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto text-center">
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <div className="text-2xl md:text-4xl font-bold text-purple-600 mb-2">
                  25-40%
                </div>
                <p className="text-sm md:text-base text-gray-700">
                  Reduction in cloud costs through targeted optimization
                </p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <div className="text-2xl md:text-4xl font-bold text-teal-600 mb-2">
                  3–6 months
                </div>
                <p className="text-sm md:text-base text-gray-700">
                  Months to achieve full ROI from your FinOps strategy
                </p>
              </div>
              <div className="bg-white p-6 md:p-8 rounded-lg shadow-sm">
                <div className="text-2xl md:text-4xl font-bold text-pink-600 mb-2">
                  99%
                </div>
                <p className="text-sm md:text-base text-gray-700">
                  Improved visibility into cloud usage and spending
                </p>
              </div>
            </div>

            {/* FinOps Steps */}
            <div className="mt-5 md:mt-10 max-w-6xl mx-auto bg-white p-6 md:p-10 rounded-xl md:rounded-2xl shadow-lg border border-gray-100">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-10 text-center">
                <span className="text-gray-800">Our </span>
                <span className="text-pink-600">FinOps</span>
                <span className="text-gray-800"> Optimization Steps</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {[
                  {
                    step: "1",
                    title: "Discover",
                    desc: "Analyze current usage and uncover cost-saving opportunities.",
                  },
                  {
                    step: "2",
                    title: "Plan",
                    desc: "Build strategic budgets and right-sizing plans for efficiency.",
                  },
                  {
                    step: "3",
                    title: "Act",
                    desc: "Implement automation, resource adjustments, and best practices.",
                  },
                  {
                    step: "4",
                    title: "Monitor",
                    desc: "Track usage, costs, and performance for ongoing improvement.",
                  },
                ].map(({ step, title, desc }) => (
                  <div
                    key={step}
                    className="bg-gradient-to-br from-white via-purple-50 to-purple-100 p-6
                             rounded-xl border border-gray-200 text-center shadow-sm hover:shadow-md
                            transition-all duration-300 ease-in-out"
                  >
                    <div className="relative w-12 h-12 mx-auto mb-4">
                      <div className="relative w-full h-full rounded-full bg-purple-100 flex items-center justify-center border-2 border-purple-600 z-10">
                        <span className="text-purple-600 font-bold text-lg">
                          {step}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-2">
                      {title}
                    </h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FinOpsPage;
