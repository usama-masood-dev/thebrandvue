import type { NextConfig } from "next";
import { getWordPressImageHostnames } from "./lib/wordpress/image-hosts";

function getWpImageRemotePatterns() {
  return getWordPressImageHostnames().map((hostname) => ({
    protocol: "https" as const,
    hostname,
    pathname: "/wp-content/uploads/**",
  }));
}

const nextConfig: NextConfig = {
  images: {
    /** Set NEXT_IMAGE_UNOPTIMIZED=1 on Hostinger if /_next/image returns errors */
    unoptimized: process.env.NEXT_IMAGE_UNOPTIMIZED === "1",
    remotePatterns: getWpImageRemotePatterns(),
  },
};

export default nextConfig;
