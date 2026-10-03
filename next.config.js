/** @type {import('next').NextConfig} */
const nextConfig = {
  // drei's <Scroll html> creates a React root during render, which breaks
  // under Strict Mode's double render in development.
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
