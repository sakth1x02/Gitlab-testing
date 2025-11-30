import type { Metadata } from "next";
import FinOpsPage from "./finopsclint";
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
    serviceName: "finops",
  } as any);
  const raw = Array.isArray(payload?.data.body.bodymsg)
    ? payload.data.body.bodymsg[0]
    : payload?.data.body.bodymsg;

  if (!raw) {
    return {
      title: "Cloud Cost Optimization & FinOps Services | HADS",
      description:
        "Optimize your cloud spending with our comprehensive FinOps services. We bring financial accountability to cloud expenses through real-time cost visibility, resource optimization, and intelligent budgeting. Our FinOps experts help organizations reduce cloud costs by 30-40% while maximizing business value and operational efficiency.",
    };
  }

  const seo: SEOData = raw; 
  console.log("seo", seo);

  return {
    title: seo.metaTitle || "Cloud Cost Optimization & FinOps Services | HADS",
    description:
      seo.metaDescription ||
      "Optimize your cloud spending with our comprehensive FinOps services. We bring financial accountability to cloud expenses through real-time cost visibility, resource optimization, and intelligent budgeting. Our FinOps experts help organizations reduce cloud costs by 30-40% while maximizing business value and operational efficiency.",
    keywords:
      seo?.keywords?.filter((k) => k.trim() !== "").join(",") ||
      "finops, cloud cost optimization, cloud spending, cost visibility, cloud budgeting, resource optimization, cloud financial management, aws cost optimization, azure cost management, gcp cost optimization, cloud waste reduction, rightsizing, reserved instances, spot instances, cloud governance",
    openGraph: {
      title:
        seo.metaTitle || "Cloud Cost Optimization & FinOps Services | HADS",
      description:
        seo.metaDescription ||
        "Optimize your cloud spending with comprehensive FinOps services. Reduce cloud costs by 30-40% while maximizing business value.",
      url: "https://www.hadstechnovations.com/services/finops",
      images: [
        {
          url: "/images/services/finops-og.jpg",
          width: 1200,
          height: 630,
          alt: "Cloud Cost Optimization FinOps Services",
        },
      ],
    },
    alternates: {
      canonical: "https://www.hadstechnovations.com/services/finops",
    },
  };
}

const FinOpsPages = () => {
  return <FinOpsPage />;
};
export default FinOpsPages;
