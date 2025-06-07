import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        PRJECT_ENV: process.env.PRJECT_ENV,
        API_URL: process.env.API_URL,
        STALE_TIME_MINUTES: process.env.STALE_TIME_MINUTES!,
        GC_TIME_MINUTES: process.env.GC_TIME_MINUTES!,
        SYMMETRIC_ENCRYPTION_KEY: process.env.SYMMETRIC_ENCRYPTION_KEY!,
        SYMMETRIC_ENCRYPTION_IV: process.env.SYMMETRIC_ENCRYPTION_IV!,
        HASHING_KEY: process.env.HASHING_KEY!
    }
};

export default nextConfig;
