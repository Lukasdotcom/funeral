import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "immich.lschaefer.xyz",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
