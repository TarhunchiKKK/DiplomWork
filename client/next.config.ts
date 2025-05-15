import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        PRJECT_ENV: process.env.PRJECT_ENV,
        API_URL: process.env.API_URL,
        STALE_TIME_MINUTES: process.env.STALE_TIME_MINUTES!,
        GC_TIME_MINUTES: process.env.GC_TIME_MINUTES!
    }
};

export default nextConfig;
