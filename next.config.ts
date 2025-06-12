import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*", // Spring Boot backend in dev
      },
    ];
  },
  images: {
    domains: ['res.cloudinary.com'],
    // Optional: if you want to use Cloudinary's image optimization features
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  // ... other config
};

module.exports = nextConfig;

