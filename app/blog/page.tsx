import type { BlogPost1 } from "@/types/blog";
import { Metadata } from "next";
import { getSeoFromLambda } from "@/app/api/seoApi";
import BlogPage from "./blogclint";

export async function generateMetadata(): Promise<Metadata> {
  console.log("[generateMetadata] running");
  const res = await getSeoFromLambda({
    type: "GET_BLOG_SEO_DETAILS",
    serviceName: "Blog",
  } as any);
  console.log("payload", res);
  const raw = Array.isArray(res?.data.body.bodymsg.seo_data)
    ? res.data.body.bodymsg.seo_data[0]
    : res?.data.body.bodymsg.seo_data;

  if (!raw) {
    return {
      title:
        "Cloud Technology Blog | Expert Insights & Tutorials | HADS TechNovations",
      description:
        "Stay ahead in the cloud game with expert articles, tutorials, and success stories on cloud migration, DevOps automation, security best practices, and digital transformation from HADS professionals. Your go-to knowledge hub for cloud technology insights.",
    };
  }

  const seo: BlogPost1 = raw;
  console.log("seo", seo);

  return {
    title:
      seo.metaTitle ||
      "Cloud Technology Blog | Expert Insights & Tutorials | HADS TechNovations",
    description:
      seo.metaDescription ||
      "Stay ahead in the cloud game with expert articles, tutorials, and success stories on cloud migration, DevOps automation, security best practices, and digital transformation from HADS professionals. Your go-to knowledge hub for cloud technology insights.",
    keywords:
      seo?.keywords?.filter((k) => k.trim() !== "").join(",") ||
      "cloud blog, DevOps tutorials, cloud migration guides, AWS best practices, Azure tutorials, GCP insights, cloud security, technology insights, digital transformation, cloud computing, infrastructure as code, containerization, kubernetes, microservices, serverless computing",
    openGraph: {
      title:
        seo.metaTitle ||
        "Cloud Migration Services | AWS, Azure, GCP Migration | HADS TechNovations",
      description:
        seo.metaDescription ||
        "Stay ahead in the cloud game with expert articles, tutorials, and success stories on cloud migration, DevOps automation, security best practices, and digital transformation from HADS professionals. Your go-to knowledge hub for cloud technology insights.",
      url: "https://www.hadstechnovations.com/blog",
      images: [
        {
          url: "https://www.hadstechnovations.com/images/insightsimages/blog.png",
          width: 1200,
          height: 630,
          alt: "HADS TechNovations Blog - Cloud Technology Insights",
        },
      ],
    },
    alternates: {
      canonical: "https://www.hadstechnovations.com/blog",
    },
  };
}

const BlogPages = () => {
  return <BlogPage />;
};

export default BlogPages;
