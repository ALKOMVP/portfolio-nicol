/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Excluir videos grandes del build (se subirán por separado o usar CDN)
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mov|mp4|webm)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/videos/[name][ext]',
      },
    });
    return config;
  },
}

module.exports = nextConfig

