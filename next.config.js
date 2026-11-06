/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    domains: ['santiago-jv.vercel.app'],
  },
  // Enable typed routes for better TypeScript support
  typedRoutes: true,
  async redirects() {
    return [
      {
        source: '/mcp',
        destination: 'https://mcp.santiago-jv.tech/docs',
        permanent: false,
      },
      {
        source: '/mcp/:path*',
        destination: 'https://mcp.santiago-jv.tech/docs',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
