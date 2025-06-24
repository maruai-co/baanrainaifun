import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/baanrainaifun",
  assetPrefix: "/baanrainaifun/",
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
