import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        API_URL: process.env.API_URL,
        LOCAL_STORAGE_JWT_KEY: process.env.LOCAL_STORAGE_JWT_KEY,
        LOCAL_STORAGE_THEME_KEY: process.env.LOCAL_STORAGE_THEME_KEY
    }
};

export default nextConfig;
