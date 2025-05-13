import { environment } from "@/shared/config";

export const isDev = () => environment.projectEnv === "development";

export const isProd = () => environment.projectEnv === "production";
