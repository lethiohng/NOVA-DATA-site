import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Roadmap và Practice đã gộp vào Learn; giữ đường dẫn cũ để không bị hỏng link.
  async redirects() {
    return [
      { source: "/roadmap", destination: "/learn", permanent: false },
      { source: "/practice", destination: "/learn", permanent: false },
      { source: "/resources", destination: "/learn", permanent: false },
      // Bài cải tiến liên tục đã tách thành 6 công cụ; đường dẫn cũ chuyển về danh mục.
      { source: "/learn/manufacturing-analytics/continuous-improvement", destination: "/learn/manufacturing-analytics", permanent: false },
    ];
  },
};

export default nextConfig;
