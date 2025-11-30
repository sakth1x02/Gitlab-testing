"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Volume2, VolumeX } from "lucide-react"
import { useInView } from "@/hooks/use-in-view"
import { useResponsive } from "@/components/responsive-context"
import Link from "next/link"

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoDesktopRef = useRef<HTMLVideoElement>(null)
  const videoMobileRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 })
  const { isMobile } = useResponsive()
  const [isVisible, setIsVisible] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [videoError, setVideoError] = useState(false)

  const toggleMute = () => {
    try {
      const videos = [videoDesktopRef.current, videoMobileRef.current].filter(Boolean)
      videos.forEach((video) => {
        if (video) {
          video.muted = !video.muted
        }
      })
      setIsMuted(!isMuted)
    } catch (error) {
      console.warn("Error toggling mute:", error)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const handleVideoError = (videoType: string) => {
    console.warn(`${videoType} video failed to load - using fallback background`)
    setVideoError(true)
  }

  return (
    <>
      <style jsx>{`
        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
        @keyframes fade-up {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .fallback-bg {
          background: linear-gradient(-45deg, #2c1810, #673ab7, #009688, #1a1a1a);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }
        @media (max-width: 767px) {
          .video-mobile {
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }
          .video-desktop {
            display: none !important;
          }
          .mute-button {
            top: 10px !important;
            right: 10px !important;
            font-size: 18px !important;
          }
        }
        @media (min-width: 768px) {
          .video-mobile {
            display: none !important;
          }
          .video-desktop {
            display: block !important;
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
          }
        }
      `}</style>

      <div
        ref={sectionRef}
        className={`relative w-full min-h-[calc(100vh-10rem)] mt-[80px] pt-[60px] pb-[60px] flex items-center justify-start overflow-hidden rounded-lg md:rounded-2xl ${videoError ? "fallback-bg" : "bg-black"
          }`}
      >
        {/* Background Videos */}
        {!videoError && (
          <>
            <video
              ref={videoDesktopRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="absolute video-desktop z-0"
              onError={() => handleVideoError("Desktop")}
            >
              {/* 🔄 Replace this test video with your own if needed */}
              <source src="/videos/Home-Page-Desktop.mp4" />

              Your browser does not support the video tag.
            </video>

            <video
              ref={videoMobileRef}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="absolute video-mobile z-0 "
              onError={() => handleVideoError("Mobile")}
            >
              {/* 🔄 Replace this test video with your own if needed */}
              <source src="/videos/Home-Page-Mobile.mp4" />

              Your browser does not support the video tag.
            </video>
          </>
        )}

        {/* Fallback Background if Video Fails */}
        {videoError && (
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_rgba(120,119,198,0.3),_transparent_50%),radial-gradient(circle_at_80%_20%,_rgba(255,119,198,0.3),_transparent_50%),radial-gradient(circle_at_40%_40%,_rgba(120,219,255,0.3),_transparent_50%)]"></div>
          </div>
        )}

        {/* Mute Button */}
        {!videoError && (
          <button
            onClick={toggleMute}
            className="absolute top-5 right-5 z-30 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition mute-button"
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

        {/* Content */}
        <div
          className={`z-20 px-4 sm:px-6 md:pl-12 md:pr-6 text-left text-white max-w-full md:max-w-3xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div
            className="inline-block mb-4 md:mb-6 px-2 md:px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs md:text-sm font-medium uppercase tracking-wider backdrop-blur-sm"
            style={{
              animation: "fade-up 1s ease forwards",
              animationDelay: "0.2s",
              opacity: 0,
            }}
          >
            Cloud Migration & Digital Transformation
          </div>

          <div className="flex flex-col items-start text-left p-0">
            <h1
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-3 md:mb-4"
              style={{
                animation: "fade-up 1s ease forwards",
                animationDelay: "0.4s",
                opacity: 0,
              }}
            >
              <span className="block mb-1">Move to the Cloud Easily with HADS</span>
              <span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-400 to-purple-500 font-extrabold text-base sm:text-xl md:text-2xl lg:text-3xl font-mono whitespace-normal sm:whitespace-nowrap overflow-hidden"
                style={{
                  maxWidth: "100%",
                  animation: "typing 4s steps(40, end) forwards",
                  display: "inline-block",
                }}
              >
                Your trusted cloud migration partner...
              </span>
              <span
                className="block text-base sm:text-lg md:text-xl lg:text-2xl mt-2"
                style={{
                  animation: "fade-up 1s ease forwards",
                  animationDelay: "0.8s",
                  opacity: 0,
                }}
              >
                With expert support
              </span>
            </h1>

            <p
              className="mt-8 text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 max-w-full md:max-w-lg leading-relaxed mb-4 md:mb-6"
              style={{
                animation: "fade-up 1s ease forwards",
                animationDelay: "1s",
                opacity: 0,
              }}
            >
              HADS makes your cloud journey smooth with expert guidance and smart solutions tailored to your business.
            </p>
          </div>

          <div className="flex justify-start">
            <Link href="/contact">
              <Button
                size={isMobile ? "default" : "lg"}
                className={`flex items-center gap-2 px-5 py-6  text-white font-medium shadow-md bg-gradient-to-r from-blue-800 to-pink-700 hover:opacity-90 transition`}
                style={{
                  animation: "fade-up 1s ease forwards",
                  animationDelay: "1.2s",
                  opacity: 0,
                }}
              >
                Free Cloud Assessment
                <ArrowRight size={isMobile ? 14 : 16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection
