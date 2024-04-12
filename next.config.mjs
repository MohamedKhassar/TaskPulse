/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "www.pngall.com",
      "www.google.com",
      "images.unsplash.com",
      "i.imgur.com",
    ],
  },
};

export default nextConfig;
