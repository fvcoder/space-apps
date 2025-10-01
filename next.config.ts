import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/dashboard/p',
        destination: '/dashboard',
        permanent: true,
      }
    ]
  }
};

export default nextConfig;
