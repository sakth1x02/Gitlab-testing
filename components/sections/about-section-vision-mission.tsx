"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"
import { useInView } from "@/hooks/use-in-view"
import { Badge } from "@/components/ui/badge"
import { Rocket, ShieldCheck, Users, Lightbulb, Smile, Trophy } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

const AboutSectionVisionMission = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 })
  const isMobile = useMediaQuery("(max-width: 768px)")

  const cardHover =
    "hover:-translate-y-4 hover:rotate-1 hover:shadow-2xl hover:border-transparent transition-all duration-500"
  const iconStyle =
    "text-hads-purple group-hover:text-hads-teal transition-transform duration-500 transform group-hover:scale-125 group-hover:-translate-y-1"

  return (
    <section
      ref={sectionRef}
      className="relative rounded-[20px] bg-gradient-to-br from-white to-hads-light/30 overflow-hidden py-10 md:py-20"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(221,240,255,0.3),transparent_50%)] pointer-events-none"></div>
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        {/* Mission / Vision / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-10 md:mb-20">
          {[
            {
              title: "Our Mission",
              desc: "Empowering organizations with cutting-edge cloud technology to drive business growth and digital transformation.",
              delay: "200",
            },
            {
              title: "Our Vision",
              desc: "To be the #1 cloud solutions provider globally — known for service excellence, innovation, and client satisfaction.",
              delay: "300",
            },
            {
              title: "Our Values",
              desc: "Innovation, Integrity, Collaboration, Excellence & Client-Centricity form the foundation of everything we do.",
              delay: "400",
            },
          ].map((item, index) => (
            <div
              key={index}
              className={cn(
                "group bg-white border border-hads-light p-4 md:p-6 rounded-2xl shadow-md transform transition-all duration-700 hover:bg-gradient-to-br hover:from-white hover:to-hads-light/40",
                cardHover,
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${item.delay}ms` }}
            >
              <h3 className="text-lg md:text-2xl font-semibold text-hads-purple mb-2 md:mb-3 group-hover:text-hads-dark transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-3 md:mb-4">{item.desc}</p>
              <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-hads-teal to-hads-purple rounded-full group-hover:scale-110 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-hads-dark mb-3 md:mb-4">
            Why Choose <span className="text-hads-pink">HADS?</span>
          </h3>
          <p className="text-base md:text-lg text-hads-dark/80 max-w-2xl mx-auto">
            Our cloud-first mindset and elite engineers bring measurable business impact, not just tech talk.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 mb-10 md:mb-20">
          {[
            { icon: Rocket, title: "Scalable Solutions", desc: "Built for future growth." },
            { icon: ShieldCheck, title: "Security First", desc: "Privacy & compliance at the core." },
            { icon: Users, title: "Expert Team", desc: "Certified engineers & strategists." },
            { icon: Lightbulb, title: "Innovation Driven", desc: "Modern tools, creative minds." },
            { icon: Smile, title: "Client Happiness", desc: "You win, we win." },
            { icon: Trophy, title: "Track Record", desc: "Trusted by startups & enterprises." },
          ].map((item, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl shadow-lg p-3 md:p-6 border border-gray-100 ${cardHover}`}
            >
              <div className="flex flex-col items-center text-center space-y-2 md:space-y-3">
                <item.icon size={isMobile ? 32 : 40} className={iconStyle} />
                <h4 className="text-sm md:text-lg font-semibold text-hads-dark group-hover:text-hads-purple transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-xs md:text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Glowing Badges */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-14">
          {["Cloud Certified", "Tailored Solutions", "24/7 Support", "Business Impact"].map((label, idx) => (
            <Badge
              key={idx}
              className="px-3 md:px-5 py-1 md:py-2 bg-gradient-to-r from-hads-purple to-hads-pink text-white text-xs md:text-sm font-medium rounded-full shadow-md hover:scale-105 hover:shadow-xl transition-all duration-700"
              style={{
                animation: "moveLeftRight 2s ease-in-out infinite",
                animationDelay: `${idx * 0.3}s`,
              }}
            >
              {label}
            </Badge>
          ))}
        </div>
        <style jsx>{`
          @keyframes moveLeftRight {
            0%,
            100% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(10px);
            }
          }
        `}</style>
      </div>
    </section>
  )
}

export default AboutSectionVisionMission
