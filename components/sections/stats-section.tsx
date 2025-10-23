"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { useInView } from "@/hooks/use-in-view"
import { Trophy, Cloud, Server, Database, Award } from "lucide-react"

interface CounterProps {
  end: number
  duration: number
  delay: number
  suffix?: string
  isInView: boolean
}

const Counter = ({ end, duration, delay, suffix = "", isInView }: CounterProps) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let startTimestamp: number
    let animationFrameId: number

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp
      const progress = Math.min((timestamp - startTimestamp) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step)
      }
    }

    const timeoutId = setTimeout(() => {
      animationFrameId = requestAnimationFrame(step)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationFrameId)
    }
  }, [end, duration, delay, isInView])

  return (
    <span>
      {count}
      {suffix}
    </span>
  )
}

const StatsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 })

  return (
    <section
      ref={sectionRef}
      className="relative rounded-[20px] py-20 overflow-hidden bg-gradient-to-br from-hads-dark via-hads-purple to-hads-dark"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-hads-dark via-hads-purple to-hads-dark opacity-80"></div>
      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <h2
          className={cn(
            "text-4xl md:text-5xl font-bold text-white mb-4 text-center transition-all duration-500 transform",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          <span className="text-white animate-bounce-subtle">
            Cloud
            <span className="mx-2 text-hads-pink">Hads</span>
          </span>
        </h2>
        <p
          className={cn(
            "text-lg text-white/70 text-center max-w-3xl mx-auto mb-16 transition-all duration-500 delay-100 transform",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          Driving digital transformation through cloud excellence with measurable results
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Stat 1 - Customers */}
          <div
            className={cn(
              "relative flex flex-col items-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:bg-white/10 hover:border-hads-teal/50 shadow-lg shadow-hads-purple/10 group",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
            style={{ transitionDelay: isInView ? "50ms" : "0ms" }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full shadow-lg animated-pulse">
                <Cloud className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="w-full h-full pt-8">
              <h3 className="text-6xl font-bold text-cyan-400 mb-3 text-center mt-2 group-hover:scale-110 transition-transform duration-300">
                <Counter end={350} duration={1000} delay={100} suffix="+" isInView={isInView} />
              </h3>
              <p className="text-white text-center text-lg font-semibold">
                Customers
                <br />
                Worldwide
              </p>
            </div>
          </div>
          {/* Stat 2 - Certifications */}
          <div
            className={cn(
              "relative flex flex-col items-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:bg-white/10 hover:border-hads-teal/50 shadow-lg shadow-hads-purple/10 group",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
            style={{ transitionDelay: isInView ? "100ms" : "0ms" }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg animated-pulse">
                <Server className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="w-full h-full pt-8">
              <h3 className="text-6xl font-bold text-blue-400 mb-3 text-center mt-2 group-hover:scale-110 transition-transform duration-300">
                <Counter end={7} duration={1000} delay={200} suffix="+" isInView={isInView} />
              </h3>
              <p className="text-white text-center text-lg font-semibold">
                Cloud
                <br />
                Certifications
              </p>
            </div>
          </div>
          {/* Stat 3 - Migrations */}
          <div
            className={cn(
              "relative flex flex-col items-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:bg-white/10 hover:border-hads-teal/50 shadow-lg shadow-hads-purple/10 group",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
            style={{ transitionDelay: isInView ? "150ms" : "0ms" }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg animated-pulse">
                <Database className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="w-full h-full pt-8">
              <h3 className="text-6xl font-bold text-purple-400 mb-3 text-center mt-2 group-hover:scale-110 transition-transform duration-300">
                <Counter end={300} duration={1000} delay={300} suffix="+" isInView={isInView} />
              </h3>
              <p className="text-white text-center text-lg font-semibold">
                Successful
                <br />
                Cloud Migrations
              </p>
            </div>
          </div>
          {/* Stat 4 - Alliances */}
          <div
            className={cn(
              "relative flex flex-col items-center p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 transform transition-all duration-500 hover:bg-white/10 hover:border-hads-teal/50 shadow-lg shadow-hads-purple/10 group",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
            style={{ transitionDelay: isInView ? "200ms" : "0ms" }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg animated-pulse">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="w-full h-full pt-8">
              <h3 className="text-6xl font-bold text-pink-400 mb-3 text-center mt-2 group-hover:scale-110 transition-transform duration-300">
                <Counter end={25} duration={800} delay={400} suffix="+" isInView={isInView} />
              </h3>
              <p className="text-white text-center text-lg font-semibold">
                Formidable
                <br />
                Industry Alliances
              </p>
            </div>
          </div>
        </div>
        {/* Enhanced awards section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Award 1 */}
          <div
            className={cn(
              "flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 transition-all duration-500 transform hover:bg-white/10 hover:border-hads-teal/30 shadow-lg shadow-hads-purple/5 group",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
            style={{ transitionDelay: isInView ? "250ms" : "0ms" }}
          >
            <div className="mr-4 bg-gradient-to-br from-cyan-500 to-cyan-400 rounded-full p-2 group-hover:scale-110 transition-transform duration-300">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1">3X Cloud Innovation</h4>
              <p className="text-white/70 text-sm">Channel Asia</p>
            </div>
          </div>
          {/* Award 2 */}
          <div
            className={cn(
              "flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 transition-all duration-500 transform hover:bg-white/10 hover:border-hads-teal/30 shadow-lg shadow-hads-purple/5 group",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
            style={{ transitionDelay: isInView ? "300ms" : "0ms" }}
          >
            <div className="mr-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full p-2 group-hover:scale-110 transition-transform duration-300">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1">ASEAN Rising Star</h4>
              <p className="text-white/70 text-sm">AWS</p>
            </div>
          </div>
          {/* Award 3 */}
          <div
            className={cn(
              "flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 transition-all duration-500 transform hover:bg-white/10 hover:border-hads-teal/30 shadow-lg shadow-hads-purple/5 group",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
            style={{ transitionDelay: isInView ? "350ms" : "0ms" }}
          >
            <div className="mr-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full p-2 group-hover:scale-110 transition-transform duration-300">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold mb-1">Outstanding Growth</h4>
              <p className="text-white/70 text-sm">Intel</p>
            </div>
          </div>
        </div>
      </div>
      {/* Pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(0, 188, 212, 0.4);
          }
          50% {
            box-shadow: 0 0 20px 5px rgba(0, 188, 212, 0.2);
          }
        }
        .animated-pulse {
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </section>
  )
}

export default StatsSection
