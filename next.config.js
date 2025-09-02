/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['santiago-jv.vercel.app'],
  },
  // Enable typed routes for better TypeScript support
  typedRoutes: true,
}

module.exports = nextConfig
