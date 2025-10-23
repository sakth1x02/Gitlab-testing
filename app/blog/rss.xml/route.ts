import { NextResponse } from "next/server"

export async function GET() {
  const baseUrl = "https://www.hadstechnovations.com"

  // Sample blog posts - replace with actual blog data
  const blogPosts = [
    {
      title: "Cloud Migration Best Practices for 2024",
      description:
        "Learn the essential strategies for successful cloud migration in 2024, including cost optimization and security considerations.",
      slug: "cloud-migration-best-practices-2024",
      publishedAt: "2024-01-15T10:00:00Z",
      author: "HADS TechNovations Team",
    },
    {
      title: "DevOps Automation: Streamlining Your Development Pipeline",
      description: "Discover how DevOps automation can reduce deployment time by 70% and improve code quality.",
      slug: "devops-automation-development-pipeline",
      publishedAt: "2024-01-10T10:00:00Z",
      author: "HADS TechNovations Team",
    },
    {
      title: "FinOps: Reducing Cloud Costs by 40% with Smart Optimization",
      description:
        "Comprehensive guide to FinOps practices that help organizations optimize cloud spending and improve ROI.",
      slug: "finops-cloud-cost-optimization",
      publishedAt: "2024-01-05T10:00:00Z",
      author: "HADS TechNovations Team",
    },
  ]

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HADS TechNovations Blog</title>
    <description>Latest insights on cloud technology, DevOps, FinOps, and digital transformation from HADS TechNovations</description>
    <link>${baseUrl}/blog</link>
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>info@hadstechnovations.com (HADS TechNovations Team)</managingEditor>
    <webMaster>info@hadstechnovations.com (HADS TechNovations Team)</webMaster>
    <category>Technology</category>
    <category>Cloud Computing</category>
    <category>DevOps</category>
    <category>FinOps</category>
    
    ${blogPosts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <author>info@hadstechnovations.com (${post.author})</author>
      <category>Cloud Technology</category>
    </item>`,
      )
      .join("")}
  </channel>
</rss>`

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
