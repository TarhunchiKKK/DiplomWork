import { Module } from "@nestjs/common";
import { DocumentAccessTokensService } from "./document-access-tokens.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>("DOCUMENT_ACCESS_JWT_SECRET"),
                signOptions: {
                    expiresIn: configService.get<string>("DOCUMENT_ACCESS_JWT_EXPIRATION")
                }
            })
        })
    ],
    providers: [DocumentAccessTokensService],
    exports: [DocumentAccessTokensService]
})
export class DocumentAccessTokensModule {}
