import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        PRJECT_ENV: process.env.PRJECT_ENV,

        // API
        API_URL: process.env.API_URL,

        // Tanstack Query
        STALE_TIME_MINUTES: process.env.STALE_TIME_MINUTES!,
        GC_TIME_MINUTES: process.env.GC_TIME_MINUTES!,

        // Recaptcha
        RECAPTCHA_KEY: process.env.RECAPTCHA_KEY!,

        // Crptography
        SYMMETRIC_ENCRYPTION_KEY: process.env.SYMMETRIC_ENCRYPTION_KEY!,
        SYMMETRIC_ENCRYPTION_IV: process.env.SYMMETRIC_ENCRYPTION_IV!,
        HASHING_KEY: process.env.HASHING_KEY!,

        // S3
        S3_ENDPOINT: process.env.S3_ENDPOINT!,
        S3_REGION: process.env.S3_REGION!,
        S3_ACCESS_KEY_ID: process.env.S3_ACCESS_KEY_ID!,
        S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY!,
        DOCUMENTS_S3_BUCKET_NAME: process.env.DOCUMENTS_S3_BUCKET_NAME!
    },
    devIndicators: false
};

export default nextConfig;
