import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions } from "@nestjs/jwt";

interface Options {
    configService: ConfigService;
}

export function getJwtConfig({ configService }: Options): JwtModuleOptions {
    return {
        secret: configService.getOrThrow<string>("JWT_SECRET"),
        signOptions: {
            expiresIn: configService.get<string>("JWT_EXPIRATION")
        }
    };
}
