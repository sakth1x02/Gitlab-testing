import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConditionalNavbar } from "@/components/navigation/conditional-navbar";
import { ResponsiveProvider } from "@/components/responsive-context";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/ui/scroll-to-top";
import ErrorBoundary from "@/components/error-boundary";
import { getSeoFromLambda } from "@/app/api/seoApi";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

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
  try {
    const payload = await getSeoFromLambda({
      type: "GET_SEO_DETAILS",
      serviceName: "home",
    } as any);

    const raw = Array.isArray(payload?.data.body.bodymsg)
      ? payload.data.body.bodymsg[0]
      : payload?.data.body.bodymsg;

    if (!raw) {
      return {
        title: "Cloud Cost Optimization & FinOps Services | HADS",
        description:
          "Optimize your cloud spending with our comprehensive FinOps services. We bring financial accountability to cloud expenses through real-time cost visibility, resource optimization, and intelligent budgeting. Our FinOps experts help organizations reduce cloud costs by 30-40% while maximizing business value and operational efficiency.",
        metadataBase: new URL("https://www.hadstechnovations.com"),
        alternates: {
          canonical: "https://www.hadstechnovations.com/",
        },
      };
    }

    const seo: SEOData = raw;

    return {
      title: seo.metaTitle || "HADS - Innovative Cloud Solutions",
      description:
        seo.metaDescription ||
        "Leading provider of cloud migration, managed services, and digital transformation solutions.",
      authors: [{ name: "HADS Technovations" }],
      creator: "HADS Technovations",
      publisher: "HADS Technovations",
      formatDetection: {
        email: false,
        address: false,
        telephone: false,
      },
      metadataBase: new URL("https://www.hadstechnovations.com"),
      alternates: {
        canonical: "https://www.hadstechnovations.com/",
        types: {
          about: "https://hadstechnovations.com/about/",
          partners: "https://hadstechnovations.com/partners/",
          blog: "https://hadstechnovations.com/blog/",
          contact: "https://hadstechnovations.com/contact/",
          cloudMigration: "https://hadstechnovations.com/services/cloud-migration/",
          devops: "https://hadstechnovations.com/services/devops/",
          finops: "https://hadstechnovations.com/services/finops/",
          securityCompliance: "https://hadstechnovations.com/services/security-compliance/",
        },
      },
      openGraph: {
        title: seo.metaTitle || "HADS - Innovative Cloud Solutions",
        description:
          seo.metaDescription ||
          "Leading provider of cloud migration, managed services, and digital transformation solutions.",
        url: "https://www.hadstechnovations.com/",
        siteName: "HADS Technovations",
        images: [
          {
            url: "/images/hads-logo.png",
            width: 1200,
            height: 630,
            alt: seo.imageAltText || "HADS Technovations",
          },
        ],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seo.metaTitle || "HADS - Innovative Cloud Solutions",
        description:
          seo.metaDescription ||
          "Leading provider of cloud migration, managed services, and digital transformation solutions.",
        images: ["/images/hads-logo.png"],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      generator: "v0.dev",
      other: {
        keywords: seo.keywords?.filter((k) => k.trim() !== "").join(",") || "",
      },
    };
  } catch (error) {
    console.error("Metadata fetch failed:", error);
    return {
      title: "HADS - Cloud Solutions",
      description: "Cloud solutions by HADS Technovations.",
      metadataBase: new URL("https://www.hadstechnovations.com"),
      alternates: {
        canonical: "https://www.hadstechnovations.com/",
      },
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-NJ5WK3K4');
            `,
          }}
        />

        {/* ✅ Apollo Website Tracker */}
        <Script
          id="apollo-tracker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              function initApollo(){
                var n=Math.random().toString(36).substring(7),
                o=document.createElement("script");
                o.src="https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache="+n;
                o.async=true; o.defer=true;
                o.onload=function(){
                  window.trackingFunctions.onLoad({ appId: "687a69c02fe530000d424638" });
                };
                document.head.appendChild(o);
              }
              initApollo();
            `,
          }}
        />

        {/* ✅ Google Verification */}
        <meta
          name="google-site-verification"
          content="HvXbYac_X5O_bqNo36f6BWuXxFuQle4Imp1afCr-VBo"
        />

        {/* ✅ Canonical & Alternates */}
        <link rel="canonical" href="https://www.hadstechnovations.com/" />
        <link rel="alternate" href="https://hadstechnovations.com/about/" />
        <link rel="alternate" href="https://hadstechnovations.com/partners/" />
        <link rel="alternate" href="https://hadstechnovations.com/blog/" />
        <link rel="alternate" href="https://hadstechnovations.com/contact/" />
        <link rel="alternate" href="https://hadstechnovations.com/services/cloud-migration/" />
        <link rel="alternate" href="https://hadstechnovations.com/services/devops/" />
        <link rel="alternate" href="https://hadstechnovations.com/services/finops/" />
        <link rel="alternate" href="https://hadstechnovations.com/services/security-compliance/" />

        {/* ✅ Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* ✅ Fonts */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* ✅ Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXX-X"
        />
        <Script
          id="ga-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'UA-XXXXXXX-X');
            `,
          }}
        />
      </head>

      <body className={inter.className}>
        {/* ✅ GTM NoScript Fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NJ5WK3K4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <ErrorBoundary>
          <ResponsiveProvider>
            <ConditionalNavbar />
            {children}
            <ScrollToTop />
            <Toaster />
          </ResponsiveProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
