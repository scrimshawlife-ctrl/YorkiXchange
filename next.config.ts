import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Required for Dockerfile that runs `node server.js` from `.next/standalone`.
   * Without this, `.next/standalone/server.js` may not exist and containers fail at runtime.
   */
  output: "standalone",

  /**
   * Keep your existing config below (images, redirects, etc).
   * Do not add secrets here.
   */
  reactStrictMode: true,
};

export default nextConfig;
