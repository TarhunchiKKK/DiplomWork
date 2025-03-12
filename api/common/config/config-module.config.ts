import { ConfigModuleOptions } from "@nestjs/config";

export function getConfigModuleConfig(): ConfigModuleOptions {
    return {
        isGlobal: true
    };
}
