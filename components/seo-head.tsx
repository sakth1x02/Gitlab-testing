"use client"

import Head from "next/head"

interface SEOHeadProps {
  title: string
  description: string
  keywords?: string
  ogUrl?: string
  schema?: object
}

const SEOHead = ({ title, description, keywords, ogUrl, schema }: SEOHeadProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {schema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />}
    </Head>
  )
}

export default SEOHead
