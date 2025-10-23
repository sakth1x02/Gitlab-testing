"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"
import { useInView } from "@/hooks/use-in-view"
import { Check, Cloud, Server, BarChart3, Settings, ShieldCheck, SlidersHorizontal } from "lucide-react"

const EnhancedCloudRoadmap = () => {
  const roadmapRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(roadmapRef, { once: true, threshold: 0.2 })

  const roadmapSteps = [
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Cloud Migration & Consulting",
      subHeading: "Strategic cloud advisory and seamless migration planning.",
      description:
        "We evaluate your existing IT infrastructure, define a cloud adoption roadmap, and guide you through the entire journey—from readiness assessment to actual migration using cloud-native best practices.",
      bullets: [
        "Infrastructure & app assessment",
        "Cloud readiness analysis",
        "Migration strategy design",
        "Cloud provider selection",
        "Consulting for hybrid/multi-cloud",
      ],
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Cloud Managed Services",
      subHeading: "Ongoing support and optimization for your cloud workloads.",
      description:
        "We provide continuous management of cloud infrastructure, ensuring high availability, security, and cost-efficiency. Our team monitors, maintains, and optimizes your workloads 24/7.",
      bullets: [
        "24/7 monitoring & alerting",
        "Patch management & automation",
        "Resource scaling & backups",
        "Cost & performance reports",
        "DevOps pipeline support",
      ],
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Cloud Cost Optimization (FinOps)",
      subHeading: "Maximize ROI with real-time cloud cost control and governance.",
      description:
        "We use FinOps principles to implement cost visibility, usage tracking, and right-sizing strategies—empowering teams to balance cost and performance effectively.",
      bullets: [
        "Cloud cost analysis & reporting",
        "Budget alerts & forecasting",
        "Rightsizing & autoscaling",
        "Idle resource clean-up",
        "Cross-team accountability",
      ],
    },
    {
      icon: <Settings className="h-6 w-6" />,
      title: "DevOps Automation",
      subHeading: "Automate infrastructure and CI/CD workflows for speed and scale.",
      description:
        "We implement end-to-end DevOps pipelines, automating build, test, deployment, and monitoring. Our approach speeds up delivery cycles and enhances system reliability.",
      bullets: [
        "CI/CD pipeline creation",
        "Infrastructure as Code (IaC)",
        "Auto-scaling & self-healing systems",
        "Monitoring & logging automation",
        "Containerization & orchestration (Docker/K8s)",
      ],
    },
    {
      icon: <ShieldCheck className="h-6 w-6" />,
      title: "Security & Compliances",
      subHeading: "Build a secure, compliant, and resilient cloud foundation.",
      description:
        "We secure your cloud infrastructure with industry best practices and compliance frameworks (e.g., ISO, SOC2, HIPAA). From identity management to vulnerability patching—we've got you covered.",
      bullets: [
        "IAM & role-based access",
        "Data encryption & backup",
        "Vulnerability scanning",
        "Compliance audits (SOC2, ISO)",
        "Incident response planning",
      ],
    },
    {
      icon: <SlidersHorizontal className="h-6 w-6" />,
      title: "Cloud Management Services",
      subHeading: "Comprehensive operational management across your cloud environments.",
      description:
        "Our Cloud Management Services provide centralized control, automation, and governance of your entire cloud infrastructure. From performance monitoring to cost controls and policy automation, we ensure your cloud operations remain efficient, secure, and scalable.",
      bullets: [
        "Multi-cloud management & dashboards",
        "Performance monitoring & alerts",
        "Backup scheduling & recovery workflows",
        "Automation of provisioning & scaling",
        "Policy-based governance & access control",
        "Cost tracking, budgeting & anomaly detection",
        "Integrated DevOps & SecOps processes",
      ],
    },
  ]

  return (
    <section
      ref={roadmapRef}
      className="md:py-10 rounded-[20px] bg-gradient-to-b from-hads-dark to-hads-purple/90 overflow-hidden relative"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4">
            <span className="text-white"> Cloud Transformation</span>
            <span className="text-hads-pink"> Roadmap</span>
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto">
            A 360° cloud strategy that covers everything from migration to optimization and beyond.
          </p>
        </div>
        <div className="relative">
          {/* For desktop */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-hads-teal to-hads-pink transform -translate-x-1/2 hidden md:block"></div>

          <div className="space-y-12 md:space-y-0">
            {roadmapSteps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col md:flex-row items-start md:items-center justify-center mb-12 md:mb-20",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                )}
              >
                {/* Content side */}
                <div
                  className={cn(
                    "w-full md:w-5/12 mb-6 md:mb-0",
                    index % 2 === 0 ? "md:text-right md:pr-16" : "md:text-left md:pl-16",
                  )}
                >
                  <div
                    className={cn(
                      "bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-white/20",
                      index % 2 === 0 ? "md:ml-auto" : "md:mr-auto",
                    )}
                  >
                    <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-between">
                      <div className="bg-hads-teal/20 p-2 rounded-full">{step.icon}</div>
                    </h3>
                    <p className="text-white/80">{step.subHeading}</p>
                    <p className="text-white/80">{step.description}</p>
                  </div>
                </div>
                {/* Center circle for desktop */}
                <div className="relative flex items-center justify-center md:mx-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-hads-teal to-hads-pink flex items-center justify-center z-10">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  {/* Vertical line for mobile */}
                  {index < roadmapSteps.length - 1 && (
                    <div className="h-20 w-1 bg-gradient-to-b from-hads-teal to-hads-pink absolute -bottom-16 md:hidden"></div>
                  )}
                </div>
                {/* Bullets side */}
                <div
                  className={cn(
                    "w-full md:w-5/12",
                    index % 2 === 0 ? "md:text-left md:pl-16" : "md:text-right md:pr-16",
                  )}
                >
                  <div className="md:hidden mt-4 mb-8 bg-white/5 p-4 rounded-lg">
                    <h4 className="text-white text-lg mb-2">Key Features:</h4>
                    {step.bullets.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 mb-1">
                        <Check size={16} className="text-green-400 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="hidden md:block space-y-2">
                    {step.bullets.map((item, i) => (
                      <div
                        key={i}
                        className={cn(
                          "flex items-center gap-2",
                          index % 2 === 1 ? "flex-row-reverse text-right" : "text-left",
                        )}
                      >
                        <Check size={16} className="text-green-400" />
                        <span className="text-white/80">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EnhancedCloudRoadmap
