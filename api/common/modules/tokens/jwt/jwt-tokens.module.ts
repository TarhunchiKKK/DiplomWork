import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtTokensService } from "./jwt-tokens.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>("JWT_SECRET"),
                signOptions: {
                    expiresIn: configService.get<string>("JWT_EXPIRATION")
                }
            })
        })
    ],
    providers: [JwtTokensService],
    exports: [JwtTokensService]
})
export class JwtTokensModule {}
