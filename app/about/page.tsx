// about/page.tsx (server-side)
import type { Metadata } from "next";
import AboutPage from "./aboutclient";
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
  const payload = await getSeoFromLambda({ type: "GET_SEO_DETAILS", serviceName: "about" });
  const seo: SEOData = Array.isArray(payload?.data.body.bodymsg)
    ? payload.data.body.bodymsg[0]
    : payload?.data.body.bodymsg;

  if (!seo) {
    return {
      title: "About HADS | AWS Partner & Cloud Solutions Provider",
      description:
        "Learn about HADS TechNovations, a leading AWS partner specializing in cloud migration, DevOps automation, and managed services.",
    };
  }

  return {
    title: seo.metaTitle || "About HADS | AWS Partner & Cloud Solutions Provider",
    description:
      seo.metaDescription ||
      "Learn about HADS TechNovations, a leading AWS partner specializing in cloud migration, DevOps automation, and managed services.",
    keywords: seo.keywords?.filter(Boolean).join(", ") || "cloud solutions, AWS partner, HADS",
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: "https://www.hadstechnovations.com/about",
      siteName: "HADS Technovations LLP",
      images: [
        {
          url: "/images/partners-og.jpg",
          width: 1200,
          height: 630,
          alt: seo.imageAltText || "HADS Cloud Services",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: ["/images/partners-og.jpg"],
    },
    alternates: {
      canonical: seo.canonicalTag || "https://www.hadstechnovations.com/about",
    },
  };
}

export default function AboutPageWrapper() {
  return <AboutPage />;
}
