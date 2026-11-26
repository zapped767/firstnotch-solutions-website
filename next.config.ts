
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/firstnotchsolutions/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
