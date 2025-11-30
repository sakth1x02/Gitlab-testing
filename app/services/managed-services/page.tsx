import { Metadata } from "next";
import { getSeoFromLambda } from "@/app/api/seoApi";
import CloudManagedServicesPage from "./managedservices";

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
  console.log("[generateMetadata] running");
  const res = await getSeoFromLambda({
    type: "GET_SEO_DETAILS",
    serviceName: "managed-services",
  } as any);
  console.log("payload", res);
  const raw = Array.isArray(res?.data.body.bodymsg)
    ? res.data.body.bodymsg[0]
    : res?.data.body.bodymsg;

  if (!raw) {
    return {
      title: "Cloud Managed Services",
      description:
        "HADS provides comprehensive 24/7 cloud infrastructure management, security, compliance, and cost optimization services with expert monitoring and support.",
    };
  }

  const seo: SEOData = raw;
  console.log("seo", seo);

  return {
    title: seo.metaTitle || "Cloud Managed Services",
    description:
      seo.metaDescription ||
      "HADS provides comprehensive 24/7 cloud infrastructure management, security, compliance, and cost optimization services with expert monitoring and support.",
    keywords:
      seo?.keywords?.filter((k) => k.trim() !== "").join(",") ||
      "cloud managed services, 24/7 cloud support, cloud monitoring, cloud infrastructure management, managed cloud hosting, cloud operations, cloud maintenance, proactive monitoring, cloud security management, cost optimization, performance tuning, disaster recovery",
    openGraph: {
      title: seo.metaTitle || "Cloud Managed Services",
      description:
        seo.metaDescription ||
        "HADS provides comprehensive 24/7 cloud infrastructure management, security, compliance, and cost optimization services with expert monitoring and support.",
      url: "https://www.hadstechnovations.com/services/managed-services",
      images: [
        {
          url: "https://www.hadstechnovations.com/images/hads-logo.png",
          width: 1200,
          height: 630,
          alt: "DevOps Automation Services",
        },
      ],
    },
    alternates: {
      canonical: "https://www.hadstechnovations.com/services/managed-services",
    },
  };
}
const CloudManagedServicesPages = () => {
  return <CloudManagedServicesPage />;
};

export default CloudManagedServicesPages;
