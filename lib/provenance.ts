export const PROVENANCE = {
  app: "YorkiExchange",
  version: "0.1.0",
  build: process.env.NEXT_PUBLIC_BUILD_ID ?? "dev",
  commit: process.env.NEXT_PUBLIC_GIT_SHA ?? "unknown",
} as const;
