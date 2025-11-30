import { Metadata } from "next";
import DevOpsClient from "./DevOpsClient";
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
export async function generateMetadata(): Promise<Metadata> {
  const payload = await getSeoFromLambda({
    type: "GET_SEO_DETAILS",
    serviceName: "devops-automation",
  } as any);
  const raw = Array.isArray(payload?.data.body.bodymsg)
    ? payload.data.body.bodymsg[0]
    : payload?.data.body.bodymsg;

  if (!raw) {
    return {
      title: "DevOps Services | HADS",
      description:
        "Accelerate your development lifecycle with our comprehensive DevOps automation services.",
    };
  }

  const seo: SEOData = raw; 
  console.log("seo", seo);

  return {
    title:
      seo.metaTitle ||
      "DevOps Automation & CI/CD Implementation Services | HADS Technovations LLP",
    description:
      seo.metaDescription ||
      "Accelerate your development lifecycle with our comprehensive DevOps automation services. Implement CI/CD pipelines, infrastructure as code, container orchestration, and monitoring solutions for faster, more reliable software delivery. Our expert team helps organizations reduce deployment times by 70% and increase release frequency by 3x through DevOps best practices.",
    keywords:
      seo?.keywords?.filter((k) => k.trim() !== "").join(",") ||
      "devops automation, CI/CD, continuous integration, continuous delivery, infrastructure as code, container orchestration, monitoring solutions, deployment automation, devops consulting, jenkins automation, docker containerization, kubernetes orchestration, terraform automation, ansible configuration, gitlab ci/cd",
    openGraph: {
      title:
        seo.metaTitle ||
        "DevOps Automation & CI/CD Implementation Services | HADS Technovations LLP",
      description:
        seo.metaDescription ||
        "Accelerate your development lifecycle with our comprehensive DevOps automation services. Implement CI/CD pipelines, infrastructure as code, container orchestration, and monitoring solutions for faster, more reliable software delivery. Our expert team helps organizations reduce deployment times by 70% and increase release frequency by 3x through DevOps best practices.",
      url: "https://www.hadstechnovations.com/services/devops",
      images: [
        {
          url: "/images/services/devops-og.jpg",
          width: 1200,
          height: 630,
          alt: "DevOps Automation Services",
        },
      ],
    },
    alternates: {
      canonical: "https://www.hadstechnovations.com/services/devops",
    },
  };
}

const DevOpsPage = () => {
  return <DevOpsClient />; 
};

export default DevOpsPage;
