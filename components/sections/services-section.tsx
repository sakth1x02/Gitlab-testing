"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"
import {
  Cloud,
  Server,
  Gauge,
  GitBranch,
  RocketIcon,
  BarChart3Icon,
  Settings,
  ShieldCheck,
  ShieldHalf,
} from "lucide-react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const frameworks = [
  {
    title: "GDPR",
    description: "Ensures data protection and privacy for individuals in the EU.",
    Image: "/images/complianceimages/gdpr-compliant.webp",
  },
  {
    title: "HIPAA",
    description: "Protects sensitive patient health information in the U.S. healthcare system.",
    Image: "/images/complianceimages/hipaa-compliant.png",
  },
  {
    title: "PCI DSS",
    description: "Secures cardholder data for organizations handling credit card information.",
    Image: "/images/complianceimages/pcidss-compliant.webp",
  },
  {
    title: "SOC",
    description: "Verifies data security, availability, and confidentiality for service providers.",
    Image: "/images/complianceimages/soc-compliant.png",
  },
  {
    title: "ISO 27001",
    description: "International standard for managing information security risks.",
    Image: "/images/complianceimages/iso27001-compliant.png",
  },
  {
    title: "NIST",
    description: "Provides cybersecurity frameworks and best practices for federal agencies.",
    Image: "/images/complianceimages/nist-compliant.png",
  },
  {
    title: "CCPA",
    description: "Grants California residents rights over their personal data.",
    Image: "/images/complianceimages/ccpa-compliant.png",
  },
  {
    title: "FedRAMP",
    description: "Standardizes cloud security assessments for U.S. federal systems.",
    Image: "/images/complianceimages/fedramp-compliant.png",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 })

  return (
    <>
      {/* Services Section */}
      <section ref={sectionRef} className="bg-white py-20">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <div className="flex items-center">
                  <div className="h-px w-12 bg-hads-pink mr-4"></div>
                  <h2 className="text-3xl md:text-4xl font-bold text-hads-dark">
                    Migrate <span className="mx-2 text-hads-pink">Modernize</span>
                  </h2>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-hads-dark mt-2">Manage The Smart Way to Cloud</h3>
              </div>
            </div>
            <p
              className={cn(
                "text-gray-700 mt-6 max-w-3xl transition-all duration-500 delay-100 transform",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
            >
              Unlock the full power of cloud services with HADS, your trusted cloud consulting and migration partner.
              Whether you're moving from on-prem, another cloud, or starting fresh — we design tailored solutions that
              drive performance, security, and business agility.
            </p>
          </div>
          {/* Service Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div
              className={cn(
                "border border-gray-200 rounded-xl p-8 transition-all duration-500 transform hover:shadow-xl hover:border-hads-teal/30 group",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: isInView ? "150ms" : "0ms" }}
            >
              <div className="w-16 h-16 rounded-full bg-hads-teal/10 flex items-center justify-center mb-6 group-hover:bg-hads-teal/20 transition-colors">
                <Cloud size={32} className="text-hads-purple" />
              </div>
              <h3 className="text-xl font-semibold text-hads-dark mb-4">Cloud Migration & Consulting</h3>
              <p className="text-gray-600 mb-6">
                Seamless migration strategies tailored to your business goals, minimizing downtime and maximizing
                performance.
              </p>
            </div>
            {/* Card 2 */}
            <div
              className={cn(
                "border border-gray-200 rounded-xl p-8 transition-all duration-500 transform hover:shadow-xl hover:border-hads-teal/30 group",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: isInView ? "200ms" : "0ms" }}
            >
              <div className="w-16 h-16 rounded-full bg-hads-teal/10 flex items-center justify-center mb-6 group-hover:bg-hads-teal/20 transition-colors">
                <GitBranch size={32} className="text-hads-purple" />
              </div>
              <h3 className="text-xl font-semibold text-hads-dark mb-4">DevOps Automation</h3>
              <p className="text-gray-600 mb-6">
                Automate your CI/CD pipelines and infrastructure provisioning for faster, more reliable software
                delivery.
              </p>
            </div>
            {/* Card 3 */}
            <div
              className={cn(
                "border border-gray-200 rounded-xl p-8 transition-all duration-500 transform hover:shadow-xl hover:border-hads-teal/30 group",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: isInView ? "250ms" : "0ms" }}
            >
              <div className="w-16 h-16 rounded-full bg-hads-teal/10 flex items-center justify-center mb-6 group-hover:bg-hads-teal/20 transition-colors">
                <Gauge size={32} className="text-hads-purple" />
              </div>
              <h3 className="text-xl font-semibold text-hads-dark mb-4">Cloud Cost Optimization (FinOps)</h3>
              <p className="text-gray-600 mb-6">
                Reduce cloud spend and improve financial accountability through advanced FinOps practices and tools.
              </p>
            </div>
            {/* Card 4 */}
            <div
              className={cn(
                "border border-gray-200 rounded-xl p-8 transition-all duration-500 transform hover:shadow-xl hover:border-hads-teal/30 group",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: isInView ? "300ms" : "0ms" }}
            >
              <div className="w-16 h-16 rounded-full bg-hads-teal/10 flex items-center justify-center mb-6 group-hover:bg-hads-teal/20 transition-colors">
                <Settings size={32} className="text-hads-purple" />
              </div>
              <h3 className="text-xl font-semibold text-hads-dark mb-4">Cloud Managed Services</h3>
              <p className="text-gray-600 mb-6">
                End-to-end management of cloud environments ensuring high availability, security, and proactive issue
                resolution.
              </p>
            </div>
            {/* Card 5 */}
            <div
              className={cn(
                "border border-gray-200 rounded-xl p-8 transition-all duration-500 transform hover:shadow-xl hover:border-hads-teal/30 group",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: isInView ? "350ms" : "0ms" }}
            >
              <div className="w-16 h-16 rounded-full bg-hads-teal/10 flex items-center justify-center mb-6 group-hover:bg-hads-teal/20 transition-colors">
                <ShieldCheck size={32} className="text-hads-purple" />
              </div>
              <h3 className="text-xl font-semibold text-hads-dark mb-4">Security & Compliances</h3>
              <p className="text-gray-600 mb-6">
                Stay compliant with industry standards while protecting your data and infrastructure with best-in-class
                cloud security practices.
              </p>
            </div>
            {/* Card 6 */}
            <div
              className={cn(
                "border border-gray-200 rounded-xl p-8 transition-all duration-500 transform hover:shadow-xl hover:border-hads-teal/30 group",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: isInView ? "400ms" : "0ms" }}
            >
              <div className="w-16 h-16 rounded-full bg-hads-teal/10 flex items-center justify-center mb-6 group-hover:bg-hads-teal/20 transition-colors">
                <ShieldHalf size={32} className="text-hads-purple" />
              </div>
              <h3 className="text-xl font-semibold text-hads-dark mb-4">Cybersecurity</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive protection from threats with proactive threat monitoring, vulnerability management, and
                rapid incident response.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Section */}
      <section className="bg-white py-20">
        <div className="container max-w-7xl mx-auto px-6 text-center">
          {/* Animation Placeholder */}
          <div className="mb-16 w-full h-96 mx-auto">
            <DotLottieReact
              src="https://lottie.host/6622227c-d1c9-4560-a959-c74377621906/aDCFtagX7m.lottie"
              loop
              autoplay
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          {/* Headline */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="text-gray-800">Em-power Your </span>
            <span className="text-hads-pink">Digital Future</span>
            <span className="text-gray-800"> with Confidence</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-10">
            At <strong>HADS TechNovation LLP</strong>, we design scalable, cloud-native, and AI-powered strategies to
            take your business to the next level—secure, agile, and built for the future.
          </p>
          {/* Updated Grid */}
          <div className="grid md:grid-cols-3 gap-6 text-left mt-16 bg-gray-100 p-6 rounded-xl">
            {[
              {
                title: "Digital Transformation Consulting",
                desc: "We assess, strategize, and guide your organization through seamless digital transformation journeys tailored to your goals.",
                icon: <RocketIcon size={20} className="text-blue-600" />,
                bg: "bg-blue-100",
              },
              {
                title: "Cloud Architecture & Migration",
                desc: "Migrate legacy systems to modern cloud environments with robust security, scalability, and cost-efficiency.",
                icon: <Cloud size={20} className="text-green-600" />,
                bg: "bg-green-100",
              },
              {
                title: "AI & Intelligent Automation",
                desc: "Automate and optimize operations with smart AI/ML solutions, from predictive analytics to process automation.",
                icon: <BarChart3Icon size={20} className="text-purple-600" />,
                bg: "bg-purple-100",
              },
              {
                title: "Full-Stack Product Engineering",
                desc: "From MVPs to enterprise platforms, we build robust web and mobile solutions using React, Node.js, and serverless technologies.",
                icon: <Settings size={20} className="text-rose-600" />,
                bg: "bg-rose-100",
              },
              {
                title: "DevOps & CI/CD Implementation",
                desc: "Accelerate delivery with best-practice CI/CD pipelines, container orchestration, and infrastructure as code.",
                icon: <Server size={20} className="text-yellow-600" />,
                bg: "bg-yellow-100",
              },
              {
                title: "Secure & Scalable APIs",
                desc: "Design and deploy APIs that are RESTful, secure, and ready to scale with your business demands.",
                icon: <ShieldCheck size={20} className="text-cyan-600" />,
                bg: "bg-cyan-100",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transform transition duration-300"
              >
                <div className={`w-10 h-10 flex items-center justify-center rounded-full mb-4 ${item.bg}`}>
                  {item.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Compliance Frameworks */}
      <section className="py-5">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-5">
            <h2 className="text-4xl font-extrabold text-hads-dark mb-4 tracking-tight">
              <span className="text-gray-800">Compliance </span>
              <span className="text-hads-pink">Frameworks</span>
            </h2>
            <p className="text-lg text-gray-600">
              We help you meet industry-specific compliance requirements with
              expert support and certifications.
            </p>
          </div>

          {/* Grid of Frameworks */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 py-8">
            {frameworks.map((framework, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.03] cursor-pointer overflow-hidden"
                style={{ minHeight: "200px" }}
              >
                {/* Gradient border effect on hover */}
                <div className="absolute inset-0 rounded-2xl z-0 bg-gradient-to-br "></div>

                {/* Content Layer */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 h-full">
                  {framework.Image && (
                    <img
                      src={framework.Image}
                      alt={framework.title}
                      style={{
                        width: "110px",
                        height: "110px",
                        objectFit: "contain",
                        marginBottom: "10px",
                      }}
                    />
                  )}
                  <h3 className="text-lg sm:text-xl font-semibold text-hads-dark group-hover:text-blue-600 transition-colors duration-300">
                    {framework.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2 group-hover:text-gray-700 transition-colors duration-300">
                    {framework.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ServicesSection
