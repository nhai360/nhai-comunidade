/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "contai-media.nyc3.cdn.digitaloceanspaces.com",
      },
    ],
  },
};

module.exports = nextConfig;
