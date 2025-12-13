/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removido output: 'export' para permitir API routes
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig

