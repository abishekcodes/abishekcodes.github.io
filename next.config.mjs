/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    // Enable CSS optimization with critters for critical CSS inlining
    optimizeCss: true,
  },
  // Compress output
  compress: true,
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Enable SWC minification (default in Next.js 14 but explicit for clarity)
  swcMinify: true,
};

export default nextConfig;
