import type { Metadata } from "next";
import SecurityComplianceClientPage from "./SecurityComplianceClientPage";
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
  const payload = await getSeoFromLambda({ type: "GET_SEO_DETAILS", serviceName: "security-compliance" } as any);
  const raw = Array.isArray(payload?.data.body.bodymsg) ? payload.data.body.bodymsg[0] : payload?.data.body.bodymsg;

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
    title:
      seo.metaTitle || "Security Compliance Services | HADS Technovations LLP",
    description: seo.metaDescription ||
      "Ensure your cloud security and compliance with HADS Technovations' services. Meet industry standards and safeguard sensitive data with our compliance frameworks.",
    keywords: seo?.keywords?.filter(k => k.trim() !== "").join(",") ||
      "security, compliance, GDPR, HIPAA, PCI DSS, ISO 27001, SOC 2, cloud security",
    openGraph: { 
      title: seo.metaTitle || "Security Compliance Services | HADS Technovations LLP",
      description: seo.metaDescription ||
        "Ensure your cloud security and compliance with HADS Technovations' services. Meet industry standards and safeguard sensitive data with our compliance frameworks.",
      url: "/services/security-compliance",
      siteName: "HADS Technovations LLP",
      images: [
        {
          url: "/images/security-compliance-og.jpg",
          width: 1200,
          height: 630,
          alt: "HADS Security & Compliance Services",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Security Compliance Services | HADS Technovations LLP",
      description:
        "Ensure your cloud security and compliance with HADS Technovations' services. Meet industry standards and safeguard sensitive data with our compliance frameworks.",
      images: ["/images/security-compliance-og.jpg"],
    },
    alternates: {
      canonical: "/services/security-compliance",
    },
  };
}
export default function SecurityCompliancePage() {
  return <SecurityComplianceClientPage />;
}
