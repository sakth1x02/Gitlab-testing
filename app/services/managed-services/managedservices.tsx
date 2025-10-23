"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import SEOHead from "@/components/seo-head";
import { ArrowRight, Cloud, ShieldCheck, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
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

const CloudManagedServicesPage = () => {
  const [seoDetais, setSeoDetails] = useState<SEOData[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("restoration");

  const toggleTab = (tabName: string) => {
    setActiveTab(activeTab === tabName ? "" : tabName);
  };

  useEffect(() => {
    getData();
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);
  const getData = async () => {
    const json = { type: "GET_SEO_DETAILS", serviceName: "managed-services" };
    const data = await getSeoFromLambda(json);
    console.log("data", data);
    setSeoDetails(data?.data.body.bodymsg ?? []);
  };
  const services = [
    {
      title: "Cloud Infrastructure Management",
      icon: <Cloud className="h-6 w-6 text-hads-purple" />,
      color: "hads-purple/10",
      text: "24/7 monitoring, provisioning, and management of your cloud resources for optimal performance.",
      backText:
        "Ensures uptime, cost efficiency, and operational continuity with expert support.",
    },
    {
      title: "Security & Compliance",
      icon: <ShieldCheck className="h-6 w-6 text-hads-teal" />,
      color: "hads-teal/10",
      text: "Enforce enterprise-grade cloud security, governance policies, and industry compliance.",
      backText:
        "Reduces risk with proactive security auditing, patching, and compliance automation.",
    },
    {
      title: "Cost Optimization & Analytics",
      icon: <TrendingUp className="h-6 w-6 text-hads-pink" />,
      color: "hads-pink/10",
      text: "Gain visibility and control over your cloud spend with smart analytics and cost-saving strategies.",
      backText:
        "Maximizes ROI with right-sizing, forecasting, and usage-based recommendations.",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cloud Managed Services",
    description:
      "HADS provides comprehensive 24/7 cloud infrastructure management, security, compliance, and cost optimization services with expert monitoring and support.",
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
    serviceType: "Cloud Management",
    areaServed: {
      "@type": "Country",
      name: "Global",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      description: "Free consultation for cloud managed services assessment",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      lastReviewed: "2024-01-15",
      "@id": "https://www.hadstechnovations.com/services/managed-services",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "189",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cloud Managed Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "24/7 Cloud Monitoring",
            description:
              "Round-the-clock infrastructure monitoring and support",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Security Management",
            description:
              "Comprehensive cloud security and compliance management",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cost Optimization",
            description: "Cloud cost analysis and optimization services",
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
          "Cloud Managed Services & 24/7 Support | HADS TechNovations"
        }
        description={
          seoDetais[0]?.metaDescription ||
          "Let HADS handle your entire cloud operations with our 24/7 managed services. Our expert team provides continuous monitoring, security management, automated backups, disaster recovery, cost optimization, and performance tuning. Reduce operational overhead by 40% and ensure 99.9% uptime."
        }
        keywords={
          seoDetais[0]?.keywords?.filter(k => k.trim() !== "").join(",") || 
          "cloud managed services, 24/7 cloud support, cloud monitoring, cloud infrastructure management, managed cloud hosting, cloud operations, cloud maintenance, proactive monitoring, cloud security management, cost optimization, performance tuning, disaster recovery"
        }
        ogUrl={seoDetais[0]?.canonicalTag || "/services/managed-services"}
        schema={structuredData}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section>
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row items-center min-h-[70vh] py-10 max-w-7xl mx-auto">
              {/* Image Column */}
              <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
                <div className="max-w-[350px] md:max-w-[500px]">
                  <Image
                    src="/images/servicesimages/cloud-managed-services.jpg"
                    alt="Cloud managed services and 24/7 support - HADS TechNovations professional cloud operations"
                    width={500}
                    height={400}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>
              {/* Text Column */}
              <div className="w-full md:w-1/2 md:pl-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-black">Cloud </span>
                  <span className="text-hads-pink">Managed</span>
                  <span className="text-black"> Services ...</span>
                </h1>
                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    Let HADS handle the complexity of <br />
                    cloud operations — from performance, <br />
                    security, and updates to backups and cost optimization.
                  </p>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    Our team handles your cloud setup daily, making it reliable
                    and efficient, so you can focus on growing your business.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flip Cards Section */}
        <section className="bg-white">
          <style jsx>{`
            .flip-card {
              perspective: 1000px;
            }
            .flip-card-inner {
              transition: transform 0.8s;
              transform-style: preserve-3d;
              position: relative;
              height: 100%;
            }
            .flip-card:hover .flip-card-inner {
              transform: rotateY(180deg);
            }
            .flip-card-front,
            .flip-card-back {
              backface-visibility: hidden;
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              border-radius: 0.75rem;
            }
            .flip-card-front {
              background-color: white;
              border: 1px solid #e5e7eb;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
              padding: 2rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              transition: box-shadow 0.3s ease;
            }
            .flip-card:hover .flip-card-front {
              box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
            }
            .flip-card-back {
              transform: rotateY(180deg);
              background-color: #f9fafb;
              border: 1px solid #e5e7eb;
              padding: 2rem;
              display: flex;
              justify-content: center;
              align-items: center;
              text-align: center;
            }
          `}</style>
          <div className="container mx-auto ">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                <span className="text-gray-800">Managed Cloud </span>
                <span className="text-hads-pink">Maximum Efficiency</span>
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                We deliver proactive, secure, and scalable cloud management
                tailored to your unique business needs.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div key={index} className="flip-card h-64 md:h-80 relative">
                  <div className="flip-card-inner w-full h-full">
                    <div className="flip-card-front">
                      <div
                        className={cn(
                          "w-12 h-12 mb-4 rounded-full flex items-center justify-center",
                          service.color === "hads-purple/10" &&
                            "bg-hads-purple/10",
                          service.color === "hads-teal/10" && "bg-hads-teal/10",
                          service.color === "hads-pink/10" && "bg-hads-pink/10"
                        )}
                      >
                        {service.icon}
                      </div>
                      <h3 className="text-lg md:text-xl font-semibold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600">
                        {service.text}
                      </p>
                    </div>
                    <div className="flip-card-back">
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">
                          {service.title}
                        </h3>
                        <p className="text-sm md:text-base text-gray-700">
                          {service.backText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                <span className="text-gray-800">Why </span>
                <span className="text-hads-pink">Choose</span>
                <span className="text-gray-800"> Managed Services?</span>
              </h2>
              <p className="text-base md:text-lg text-gray-700">
                Streamline your cloud operations with our end-to-end managed
                services that deliver peace of mind and business growth.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Proactive Monitoring & Support",
                  text: "We handle all maintenance, alerts, and incident response to keep your systems running smoothly.",
                },
                {
                  title: "Customized Cloud Solutions",
                  text: "Services tailored to your tech stack, business goals, and operational needs.",
                },
                {
                  title: "Scalability On Demand",
                  text: "Automatically scale up or down based on usage to maintain performance and cost-efficiency.",
                },
                {
                  title: "Compliance Assurance",
                  text: "Meet industry standards and regulations effortlessly with our expert guidance.",
                },
                {
                  title: "Business Continuity",
                  text: "Disaster recovery, backups, and availability strategies built in by design.",
                },
                {
                  title: "Single Pane of Glass Visibility",
                  text: "Real-time dashboards, reporting, and insights on your cloud ecosystem.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-5 md:p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <ArrowRight className="h-6 w-6 md:h-7 md:w-7 text-hads-teal flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-base md:text-lg font-semibold mb-1 text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-700">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Tab Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            {/* Header */}
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                <span className="text-gray-800">Unlock your cloud </span>
                <span className="text-hads-pink">infrastructure</span>
                <span className="text-gray-800"> true potential</span>
              </h2>
              <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
                Our solutions and cloud managed services help boost resilience
                and efficiency, reduce downtime, and support peak performance —
                ensuring a cloud setup that scales with your business growth.
              </p>
            </div>
            {/* Tab Cards */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {/* Restoration Management */}
              <div className="w-full md:w-[30%] min-w-[280px]">
                <div
                  onClick={() => toggleTab("restoration")}
                  className="cursor-pointer flex items-center gap-2 text-hads-pink font-medium text-lg px-4 md:px-5 py-3 md:py-4 rounded-lg transition duration-300 ease-in-out hover:bg-pink-50"
                >
                  <span className="text-pink-500 text-xl md:text-2xl font-bold">
                    {activeTab === "restoration" ? "➖" : "➕"}
                  </span>
                  Restoration Management
                </div>
                {activeTab === "restoration" && (
                  <div className="bg-white p-4 md:p-5 mt-3 rounded-lg shadow-md">
                    <p className="text-sm md:text-base">
                      We ensure disaster recovery readiness and quick
                      restoration of systems in case of service disruption.
                    </p>
                    <ul className="list-disc pl-5 mt-3 text-gray-700 text-sm md:text-base">
                      <li>Ensure system uptime with recovery protocols</li>
                      <li>Utilize backup and replication strategies</li>
                      <li>Perform regular recovery drills</li>
                      <li>Monitor recovery times for optimization</li>
                    </ul>
                  </div>
                )}
              </div>
              {/* Automated Backups */}
              <div className="w-full md:w-[30%] min-w-[280px]">
                <div
                  onClick={() => toggleTab("backup")}
                  className="cursor-pointer flex items-center gap-2 text-hads-pink font-medium text-lg px-4 md:px-5 py-3 md:py-4 rounded-lg transition duration-300 ease-in-out hover:bg-pink-50"
                >
                  <span className="text-pink-500 text-xl md:text-2xl font-bold">
                    {activeTab === "backup" ? "➖" : "➕"}
                  </span>
                  Automated Backups
                </div>
                {activeTab === "backup" && (
                  <div className="bg-white p-4 md:p-5 mt-3 rounded-lg shadow-md">
                    <p className="text-sm md:text-base">
                      Automated backup scheduling with retention policies to
                      safeguard your data and configurations.
                    </p>
                    <ul className="list-disc pl-5 mt-3 text-gray-700 text-sm md:text-base">
                      <li>Automate data backups at regular intervals</li>
                      <li>Ensure compliance with data retention policies</li>
                      <li>Provide backup verification and validation</li>
                      <li>Enable seamless data restoration from backups</li>
                    </ul>
                  </div>
                )}
              </div>
              {/* Performance Monitoring */}
              <div className="w-full md:w-[30%] min-w-[280px]">
                <div
                  onClick={() => toggleTab("monitoring")}
                  className="cursor-pointer flex items-center gap-2 text-hads-pink font-medium text-lg px-4 md:px-5 py-3 md:py-4 rounded-lg transition duration-300 ease-in-out hover:bg-pink-50"
                >
                  <span className="text-pink-500 text-xl md:text-2xl font-bold">
                    {activeTab === "monitoring" ? "➖" : "➕"}
                  </span>
                  Performance Monitoring
                </div>
                {activeTab === "monitoring" && (
                  <div className="bg-white p-4 md:p-5 mt-3 rounded-lg shadow-md">
                    <p className="text-sm md:text-base">
                      Real-time monitoring and alerting systems to ensure your
                      cloud stays healthy and performant.
                    </p>
                    <ul className="list-disc pl-5 mt-3 text-gray-700 text-sm md:text-base">
                      <li>Track cloud resource usage and health</li>
                      <li>Real-time alerts for potential issues</li>
                      <li>Ensure service uptime and minimize downtime</li>
                      <li>Optimize cloud infrastructure for performance</li>
                    </ul>
                  </div>
                )}
              </div>
              {/* Cost Optimization */}
              <div className="w-full md:w-[30%] min-w-[280px]">
                <div
                  onClick={() => toggleTab("cost")}
                  className="cursor-pointer flex items-center gap-2 text-hads-pink font-medium text-lg px-4 md:px-5 py-3 md:py-4 rounded-lg transition duration-300 ease-in-out hover:bg-pink-50"
                >
                  <span className="text-pink-500 text-xl md:text-2xl font-bold">
                    {activeTab === "cost" ? "➖" : "➕"}
                  </span>
                  Cost Optimization
                </div>
                {activeTab === "cost" && (
                  <div className="bg-white p-4 md:p-5 mt-3 rounded-lg shadow-md">
                    <p className="text-sm md:text-base">
                      Analyze and optimize cloud spending through usage tracking
                      and budget alerts for maximum efficiency.
                    </p>
                    <ul className="list-disc pl-5 mt-3 text-gray-700 text-sm md:text-base">
                      <li>Track cloud usage and spending trends</li>
                      <li>Set up cost optimization alerts and budgets</li>
                      <li>Ensure you only pay for the resources you need</li>
                      <li>Analyze cloud costs with reports and insights</li>
                    </ul>
                  </div>
                )}
              </div>
              {/* Patch Management */}
              <div className="w-full md:w-[30%] min-w-[280px]">
                <div
                  onClick={() => toggleTab("patch")}
                  className="cursor-pointer flex items-center gap-2 text-hads-pink font-medium text-lg px-4 md:px-5 py-3 md:py-4 rounded-lg transition duration-300 ease-in-out hover:bg-pink-50"
                >
                  <span className="text-pink-500 text-xl md:text-2xl font-bold">
                    {activeTab === "patch" ? "➖" : "➕"}
                  </span>
                  Patch Management
                </div>
                {activeTab === "patch" && (
                  <div className="bg-white p-4 md:p-5 mt-3 rounded-lg shadow-md">
                    <p className="text-sm md:text-base">
                      Regular updates and patching of systems to mitigate
                      security vulnerabilities and ensure stability.
                    </p>
                    <ul className="list-disc pl-5 mt-3 text-gray-700 text-sm md:text-base">
                      <li>Apply patches regularly to mitigate risks</li>
                      <li>
                        Ensure system security by patching vulnerabilities
                      </li>
                      <li>Automate patch deployment for efficiency</li>
                      <li>Test patches to avoid system disruptions</li>
                    </ul>
                  </div>
                )}
              </div>
              {/* Cloud Migration Support */}
              <div className="w-full md:w-[30%] min-w-[280px]">
                <div
                  onClick={() => toggleTab("migration")}
                  className="cursor-pointer flex items-center gap-2 text-hads-pink font-medium text-lg px-4 md:px-5 py-3 md:py-4 rounded-lg transition duration-300 ease-in-out hover:bg-pink-50"
                >
                  <span className="text-pink-500 text-xl md:text-2xl font-bold">
                    {activeTab === "migration" ? "➖" : "➕"}
                  </span>
                  Cloud Migration Support
                </div>
                {activeTab === "migration" && (
                  <div className="bg-white p-4 md:p-5 mt-3 rounded-lg shadow-md">
                    <p className="text-sm md:text-base">
                      Seamless migration of workloads, applications, and
                      databases with minimal downtime and expert support.
                    </p>
                    <ul className="list-disc pl-5 mt-3 text-gray-700 text-sm md:text-base">
                      <li>
                        Plan and execute cloud migrations with minimal downtime
                      </li>
                      <li>
                        Expert support for moving applications to the cloud
                      </li>
                      <li>Optimize infrastructure for cloud platforms</li>
                      <li>
                        Ensure application compatibility with cloud environments
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CloudManagedServicesPage;
