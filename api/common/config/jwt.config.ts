import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

export function getJwtConfig(configService: ConfigService): JwtModuleOptions {
    return {
        secret: configService.getOrThrow<string>("JWT_SECRET"),
        signOptions: {
            expiresIn: configService.get<string>("JWT_EXPIRATION")
        }
    };
}
