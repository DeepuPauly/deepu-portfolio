import type { NextConfig } from "next";

// Static media never changes name-for-name, so let browsers/CDNs cache it hard.
// (Files in /public are otherwise served with max-age=0 and re-validated every visit.)
const longCache = [
  { key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      { source: "/videos/:path*", headers: longCache },
      { source: "/posters/:path*", headers: longCache },
    ];
  },
};

export default nextConfig;
