import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions } from "@nestjs/jwt";

type JwtConfigOptions = {
    configService: ConfigService;
};

export function getJwtConfig(): JwtModuleAsyncOptions {
    return {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
            secret: configService.getOrThrow<string>("JWT_SECRET"),
            signOptions: {
                expiresIn: configService.get<string>("JWT_EXPIRATION")
            }
        })
    };
}
