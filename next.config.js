/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverMinification: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
