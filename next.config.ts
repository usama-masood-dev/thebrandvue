import type { NextConfig } from "next";

function getWpImageRemotePattern() {
  const wpUrl =
    process.env.NEXT_PUBLIC_WP_URL ?? "https://dev.thebrandvue.com";

  let hostname: string;
  try {
    hostname = new URL(wpUrl).hostname;
  } catch {
    hostname = "dev.thebrandvue.com";
  }

  return {
    protocol: "https" as const,
    hostname,
    pathname: "/wp-content/uploads/**",
  };
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [getWpImageRemotePattern()],
  },
};

export default nextConfig;
