/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    domains: ['santiago-jv.vercel.app'],
  },
  // Enable typed routes for better TypeScript support
  typedRoutes: true,
}

module.exports = nextConfig
