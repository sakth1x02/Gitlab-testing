const defaultSEO = {
  title: "HADS TechNovations - Cloud Technology Solutions & Digital Transformation",
  description:
    "Leading cloud technology solutions provider specializing in cloud migration, DevOps automation, managed services, security compliance, and FinOps. Transform your business with expert cloud consulting and 24/7 support.",
  canonical: "https://www.hadstechnovations.com",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.hadstechnovations.com",
    siteName: "HADS TechNovations",
    title: "HADS TechNovations - Cloud Technology Solutions & Digital Transformation",
    description:
      "Leading cloud technology solutions provider specializing in cloud migration, DevOps automation, managed services, security compliance, and FinOps.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "HADS TechNovations - Cloud Technology Solutions",
      },
    ],
  },
  twitter: {
    handle: "@hadstechnovations",
    site: "@hadstechnovations",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "cloud migration, devops automation, cloud managed services, finops, cloud security, compliance services, digital transformation, cloud consulting, AWS migration, Azure migration, GCP migration",
    },
    {
      name: "author",
      content: "HADS TechNovations LLP",
    },
    {
      name: "robots",
      content: "index,follow",
    },
    {
      name: "googlebot",
      content: "index,follow",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/favicon.ico",
      sizes: "76x76",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
  ],
}

export default defaultSEO
