/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true, // Ensures all pages end with /
  output: 'export',    // Enables static export mode
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // Required for static export when using next/image
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hads-seo-blogs.s3.ap-south-1.amazonaws.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

module.exports = nextConfig;
