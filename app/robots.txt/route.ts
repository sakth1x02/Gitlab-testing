// app/robots.txt/route.ts

import { NextResponse } from "next/server"

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /private/

Sitemap: https://www.hadstechnovations.com/sitemap.xml

# Crawl-delay for all bots
Crawl-delay: 1`

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  })
}
