/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['santiago-jv.vercel.app'],
  },
  // Enable experimental features for better TypeScript support
  experimental: {
    typedRoutes: true,
  },
}

module.exports = nextConfig
