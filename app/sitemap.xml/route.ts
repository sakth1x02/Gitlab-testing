// app/sitemap.xml/route.ts

import { NextResponse } from "next/server"

export async function GET() {
  const baseUrl = "https://www.hadstechnovations.com"

  const staticPages = [
    "",
    "/about",
    "/contact",
    "/partners",
    "/blog",
    "/services/cloud-migration",
    "/services/managed-services",
    "/services/devops",
    "/services/finops",
    "/services/security-compliance",
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
  .map((page) => {
    const loc = `${baseUrl}${page}`
    const lastmod = new Date().toISOString()
    const changefreq =
      page === ""
        ? "daily"
        : page.includes("/blog")
        ? "weekly"
        : "monthly"
    const priority =
      page === ""
        ? "1.0"
        : page.includes("/services")
        ? "0.8"
        : "0.6"

    return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  })
  .join("")}
</urlset>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
