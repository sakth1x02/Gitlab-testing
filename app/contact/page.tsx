import type { Metadata } from "next";
import ContactPage from "./clientcontact";
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
  const payload = await getSeoFromLambda({ type: "GET_SEO_DETAILS", serviceName: "contact" } as any);
  const raw = Array.isArray(payload?.data.body.bodymsg) ? payload.data.body.bodymsg[0] : payload?.data.body.bodymsg;

  if (!raw) {
    return {
      title: "Contact Us | HADS TechNovations - Cloud Solutions Provider",
      description:
        "Get in touch with HADS TechNovations for cloud solutions, partnership inquiries, or support.",
    };
  }

  const seo: SEOData = raw;
  console.log("seo-ddd", seo);
  return {
    title:
      seo.metaTitle || "Contact Us | HADS Technovations LLP",
    description: seo.metaDescription ||
      "Get in touch with HADS TechNovations for cloud solutions, partnership inquiries, or support.",
    keywords: seo?.keywords?.filter(k => k.trim() !== "").join(",") ||
      "contact, cloud solutions, HADS TechNovations, support, partnership",
    openGraph: {
      title: seo.metaTitle || "Contact Us | HADS Technovations LLP",
      description: seo.metaDescription ||
        "Get in touch with HADS TechNovations for cloud solutions, partnership inquiries, or support.",
      url: "/contact",
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
      title: "Contact Us | HADS Technovations LLP",
      description:
        "Discover HADS TechNovations' strategic partnerships with leading technology providers including AWS, Google Cloud, and Azure to deliver exceptional cloud solutions.",
      images: ["/images/partners-og.jpg"],
    },
    alternates: {
      canonical: "/services/security-compliance",
    },
  };
}

const ContactPageWrapper = () => {
  return <ContactPage />;
};

export default ContactPageWrapper;
