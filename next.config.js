/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Excluir rutas API del build estático (solo para desarrollo local)
  // En producción, Cloudflare Pages usará functions/api/
  async generateBuildId() {
    return 'build-' + Date.now();
  },
}

module.exports = nextConfig

