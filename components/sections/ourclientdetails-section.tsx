"use client";

import { useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { Briefcase } from "lucide-react";

const OurClientDetailsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, threshold: 0.9 });
    const clients = [
        {
            clientName: "aludecor",
            logo: "/images/clientimages/aludecor.png",
            description:
                "Leading ACP manufacturer for facades, interiors, and signage."
        },
        {
            clientName: "amaram",
            logo: "/images/clientimages/amaram.png",
            description:
                "Known for AMARON batteries and power solutions."
        },
        {
            clientName: "cords",
            logo: "/images/clientimages/cords.png",
            description:
                "Cables and wires for industrial and infrastructure use."
        },
        {
            clientName: "gala",
            logo: "/images/clientimages/gala.png",
            description:
                "Cybersecurity and cloud infrastructure solutions."
        },
        {
            clientName: "indushealth",
            logo: "/images/clientimages/indushealth.png",
            description:
                "Digital partner for modern healthcare systems."
        },
        {
            clientName: "karkinos",
            logo: "/images/clientimages/karkinos.png",
            description:
                "Tech-driven cancer care platform."
        },
        {
            clientName: "loop",
            logo: "/images/clientimages/loop.png",
            description:
                "Employee healthcare and wellness benefits provider."
        },
        {
            clientName: "medfin",
            logo: "/images/clientimages/medfin.png",
            description:
                "Surgical financing and aggregator platform."
        },
        {
            clientName: "medisimavr",
            logo: "/images/clientimages/medisimavr.png",
            description:
                "VR simulations for medical training."
        },
        {
            clientName: "napierhealthcare",
            logo: "/images/clientimages/napierhealthcare.png",
            description:
                "Hospital and mobile health software provider."
        },
        {
            clientName: "pathkin",
            logo: "/images/clientimages/pathkin.png",
            description:
                "AI-based cloud pathology diagnostics."
        },
        {
            clientName: "rockman",
            logo: "/images/clientimages/rockman.png",
            description:
                "Auto components maker with smart automation."
        },
        {
            clientName: "romsons",
            logo: "/images/clientimages/romsons.png",
            description:
                "Medical consumables for global healthcare."
        },
        {
            clientName: "verical",
            logo: "/images/clientimages/verical.png",
            description:
                "Digital distributor of electronic components."
        }
    ];
    const duplicatedClients = [...clients, ...clients];
    const [errorLogos, setErrorLogos] = useState<boolean[]>(
        Array(duplicatedClients.length).fill(false)
    );

    const handleImageError = (index: number) => {
        setErrorLogos((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
        });
    };

    return (
        <section
            ref={sectionRef}
            className="relative overflow-hidden pb-[100px]"
            aria-labelledby="partners-heading"
        >
            <div className="max-w-5xl mx-auto text-center mb-10 px-4">
                <h2 className="text-4xl font-bold text-hads-dark mb-3">
                    <span className="text-gray-800">Our Valuable </span>
                    <span className="text-hads-pink">Clients</span>
                </h2>
                <p className="text-base text-gray-600 max-w-xl mx-auto">
                    We serve customers across diverse sectors, including Automotive,
                    Healthcare, Medical, Electrical, Textile, and Education industries.
                </p>
            </div>

            <div className="w-full overflow-hidden">
                <div className="whitespace-nowrap">
                    <div
                        className={cn(
                            "inline-flex gap-6 animate-slide",
                            isInView ? "opacity-100" : "opacity-0"
                        )}
                        style={{ animationDuration: "40s" }}
                    >
                        {duplicatedClients.map((client, index) => (
                            <div
                                key={`${client.clientName}-${index}`}
                                className="w-[240px] rounded-xl p-4 flex-shrink-0 transition-transform hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="flex flex-col items-center text-center">
                                    {!errorLogos[index] ? (
                                        <img
                                            src={client.logo}
                                            alt={`${client.clientName} logo`}
                                            className="h-14 max-w-[100px] mb-3 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                                            onError={() => handleImageError(index)}
                                        />
                                    ) : (
                                        <Briefcase className="h-12 w-12 text-gray-400 mb-3" />
                                    )}
                                    <h3 className="text-base font-semibold text-hads-dark mb-1 capitalize">
                                        {client.clientName}
                                    </h3>
                                    <p className="text-xs text-gray-600 text-wrap break-words leading-snug max-h-[3.5rem] overflow-hidden">
                                        {client.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scoped Keyframes for Animation */}
            <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slide {
          animation: slide 40s linear infinite;
        }
      `}</style>
        </section>
    );
};

export default OurClientDetailsSection;
