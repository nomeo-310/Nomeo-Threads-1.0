/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.clerk.com'
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.dev'
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev'
      },
      {
        protocol: 'https',
        hostname: 'utfs.io'
      },
      {
        protocol: 'https',
        hostname: 'placehold.co'
      }
    ]
  }
};

export default nextConfig;
