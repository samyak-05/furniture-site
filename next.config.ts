import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google Profile Pics ke liye
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // For Cloudinary product images
      },
    ],
  },
};

export default nextConfig;