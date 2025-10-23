"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    quote:
      "Your team made our cloud migration smooth and stress-free. Everything was completed on time without any issues.",
    name: "Anjali Mehta",
    title: "IT Head",
    company: "Mehta Textiles Ltd",
    colorScheme: "purple",
  },
  {
    id: 2,
    quote:
      "We were very impressed with your cloud infrastructure setup. Excellent automation and clear documentation.",
    name: "Rohit Sharma",
    title: "Marketing Manager",
    company: "SmartTech India",
    colorScheme: "pink",
  },
  {
    id: 3,
    quote:
      "Very professional service for our cloud cost optimization project. We achieved great savings thanks to your guidance.",
    name: "Sneha Rao",
    title: "Finance Manager",
    company: "Luxe Planners Pvt Ltd",
    colorScheme: "purple",
  },
  {
    id: 4,
    quote:
      "Your DevOps team was quick and efficient. The CI/CD pipeline setup reduced our deployment time by 60%.",
    name: "Manish Verma",
    title: "HR Manager",
    company: "Infosol Pvt Ltd",
    colorScheme: "pink",
  },
  {
    id: 5,
    quote:
      "We got full support for managing our AWS accounts. Monitoring, backups, and patching were handled smoothly.",
    name: "Neetu Sharma",
    title: "Principal",
    company: "Delhi Public School",
    colorScheme: "purple",
  },
  {
    id: 6,
    quote:
      "Great support for setting up secure infrastructure. Your team explained everything patiently and delivered on time.",
    name: "Arvind Kumar",
    title: "Operations Head",
    company: "AK Enterprises",
    colorScheme: "pink",
  },
  {
    id: 7,
    quote:
      "Thanks to your timely cloud migration, our business never faced downtime. Very responsive support team!",
    name: "Kavya Iyer",
    title: "Project Manager",
    company: "Iyer Solutions",
    colorScheme: "purple",
  },
  {
    id: 8,
    quote:
      "Your team managed our FinOps strategy well. We were able to identify and fix hidden cloud wastage.",
    name: "Deepak Nair",
    title: "Admin Officer",
    company: "IT Blends Ltd",
    colorScheme: "pink",
  },
  {
    id: 9,
    quote:
      "Highly satisfied with your managed services. System uptime improved and incidents reduced drastically.",
    name: "Pooja Singh",
    title: "Support Lead",
    company: "NextGen Weddings",
    colorScheme: "purple",
  },
  {
    id: 10,
    quote:
      "The DevOps automation setup was perfect. We now deploy daily with full rollback and monitoring support.",
    name: "Ayesha Khan",
    title: "Creative Head",
    company: "Style Nation",
    colorScheme: "pink",
  },
  {
    id: 11,
    quote:
      "Excellent cybersecurity support. Your regular audits and timely updates helped us stay compliant and secure.",
    name: "Nikhil Reddy",
    title: "Event Host",
    company: "Trendy Beats",
    colorScheme: "purple",
  },
  {
    id: 12,
    quote:
      "We appreciate your help with our multi-region AWS setup. The architecture is now scalable and stable.",
    name: "Ramesh Pillai",
    title: "Regional Manager",
    company: "AutoZoom India",
    colorScheme: "pink",
  },
  {
    id: 13,
    quote:
      "Thanks for handling our compliance checklist and audit requirements. Everything was managed professionally.",
    name: "Bhavna Patel",
    title: "Cultural Head",
    company: "Traditions Club",
    colorScheme: "purple",
  },
  {
    id: 14,
    quote:
      "Your support team is responsive and knowledgeable. We had zero disruptions during our tech seminar.",
    name: "Tarun Deshmukh",
    title: "Event Partner",
    company: "NextTech India",
    colorScheme: "pink",
  },
  {
    id: 15,
    quote:
      "Very good managed service team. They take care of system updates, monitoring, and scaling without our involvement.",
    name: "Meera Joshi",
    title: "HR Executive",
    company: "Mahindra Finserve",
    colorScheme: "purple",
  },
  {
    id: 16,
    quote:
      "Your FinOps report helped us understand our cloud spend clearly. We saved over 25% in just 2 months.",
    name: "Siddharth Jain",
    title: "Owner",
    company: "Urban Interiors",
    colorScheme: "pink",
  },
  {
    id: 17,
    quote:
      "We appreciate your fast response and hands-on approach. Our cloud workloads now run more efficiently.",
    name: "Preeti Shah",
    title: "Technical Lead",
    company: "Family Events",
    colorScheme: "purple",
  },
  {
    id: 18,
    quote:
      "Best decision to choose your team for our cloud transformation. Your automation saved us a lot of manual effort.",
    name: "Alok Bansal",
    title: "Event Host",
    company: "BizAwards India",
    colorScheme: "pink",
  },
  {
    id: 19,
    quote:
      "Thank you for supporting our NGO infrastructure. Your cloud setup helped us manage donations and events online.",
    name: "Anita Das",
    title: "Coordinator",
    company: "Helping Hands Foundation",
    colorScheme: "purple",
  },
  {
    id: 20,
    quote:
      "Our backend systems are now fully on cloud. Cost is optimized and performance has improved drastically.",
    name: "Rajesh Khanna",
    title: "Celebrant",
    company: "Personal Event",
    colorScheme: "pink",
  },
];


const motionVariants = [
  { y: -200, opacity: 0 },
  { y: 200, opacity: 0 },
  { y: -200, opacity: 0 },
  { y: 200, opacity: 0 },
  { y: -200, opacity: 0 },
  { y: 200, opacity: 0 },
];

const TestimonialsSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const countToShow = 6;
  const totalTestimonials = testimonials.length;

  const next = () => {
    setStartIndex((prev) => (prev + countToShow) % totalTestimonials);
  };

  const prev = () => {
    setStartIndex((prev) =>
      (prev - countToShow + totalTestimonials) % totalTestimonials
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 9500);
    return () => clearInterval(interval);
  }, []);

  const visibleTestimonials: typeof testimonials = [];
  for (let i = 0; i < countToShow; i++) {
    const index = (startIndex + i) % totalTestimonials;
    visibleTestimonials.push(testimonials[index]);
  }

  return (
    <section className="relative py-24 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-hads-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-hads-pink/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-hads-teal/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-hads-dark mb-3">
          Client <span className="text-hads-pink">Testimonials</span>
        </h2>
        <p className="text-gray-600 text-lg mb-10">
          Hear what our clients say about their experience with us.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleTestimonials.map((testimonial, i) => (
            <AnimatePresence key={testimonial.id} mode="wait">
              <motion.div
                key={`${testimonial.id}-${startIndex}`}
                initial={motionVariants[i]}
                animate={{ y: 0, opacity: 1 }}
                exit={motionVariants[i]}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="rounded-2xl p-6 flex flex-col items-center text-center"
              >
                <div
                  // className={cn(
                  //   "mb-4 p-[6px] rounded-full shadow-md",
                  //   testimonial.colorScheme === "purple"
                  //     ? "bg-gradient-to-br from-hads-purple to-hads-teal"
                  //     : "bg-gradient-to-br from-hads-pink to-hads-purple"
                  // )}
                >
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback
                      className={cn(
                        "text-white text-xl font-semibold",
                        testimonial.colorScheme === "purple"
                          ? "bg-hads-purple"
                          : "bg-hads-pink"
                      )}
                    >
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h4 className="text-lg font-bold text-hads-dark">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {testimonial.title} — {testimonial.company}
                </p>
                <p className="text-gray-700 text-base">“{testimonial.quote}”</p>
              </motion.div>
            </AnimatePresence>
          ))}
        </div>

        {/* Navigation Arrows */}
        {/* <div className="mt-10 flex justify-center gap-4">
          <button
            onClick={prev}
            className="p-3 bg-hads-purple text-white rounded-full shadow hover:scale-110 transition"
            aria-label="Previous"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="p-3 bg-hads-pink text-white rounded-full shadow hover:scale-110 transition"
            aria-label="Next"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default TestimonialsSection;
