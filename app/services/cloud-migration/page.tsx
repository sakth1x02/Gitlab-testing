import { Metadata } from "next";
import { getSeoFromLambda } from "@/app/api/seoApi";
import CloudMigrationPage from "./cloudmigrationclint";

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
    serviceName: "cloud-migration",
  } as any);
  console.log("payload", res);
  const raw = Array.isArray(res?.data.body.bodymsg)
    ? res.data.body.bodymsg[0]
    : res?.data.body.bodymsg;

  if (!raw) {
    return {
      title:
        "Cloud Migration Servicesvvbbvv | AWS, Azure, GCP Migration | HADS TechNovations",
      description:
        "Seamlessly migrate your business to the cloud with HADS expert consulting. Our comprehensive cloud migration services ensure minimal disruption with maximum business value. Get strategic planning, execution, and post-migration support from certified AWS, Azure, and GCP professionals.",
    };
  }

  const seo: SEOData = raw;
  console.log("seo", seo);

  return {
    title:
      seo.metaTitle ||
      "Cloud Migration Services | AWS, Azure, GCP Migration | HADS TechNovations",
    description:
      seo.metaDescription ||
      "Seamlessly migrate your business to the cloud with HADS expert consulting. Our comprehensive cloud migration services ensure minimal disruption with maximum business value. Get strategic planning, execution, and post-migration support from certified AWS, Azure, and GCP professionals.",
    keywords:
      seo?.keywords?.filter((k) => k.trim() !== "").join(",") ||
      "cloud migration, AWS migration, Azure migration, GCP migration, cloud consulting, digital transformation, cloud strategy, infrastructure migration, application migration, database migration, hybrid cloud, multi-cloud, cloud assessment, migration planning",
    openGraph: {
      title:
        seo.metaTitle ||
        "Cloud Migration Services | AWS, Azure, GCP Migration | HADS TechNovations",
      description:
        seo.metaDescription ||
        "Seamlessly migrate your business to the cloud with HADS expert consulting. Our comprehensive cloud migration services ensure minimal disruption with maximum business value. Get strategic planning, execution, and post-migration support from certified AWS, Azure, and GCP professionals.",
      url: "https://www.hadstechnovations.com/services/cloud-migration",
      images: [
        {
          url: "https://www.hadstechnovations.com/images/servicesimages/cloud-migration-consulting.png",
          width: 1200,
          height: 630,
          alt: "Cloud Migration Services - HADS TechNovations",
        },
      ],
    },
    alternates: {
      canonical: "https://www.hadstechnovations.com/services/cloud-migration",
    },
  };
}

const CloudMigrationPages = () => {
  return <CloudMigrationPage />;
};

export default CloudMigrationPages;
