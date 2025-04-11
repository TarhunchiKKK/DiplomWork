import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PasswordRecoveryTokensService } from "./password-recovery-tokens.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>("PASSWORD_RECEVERY_JWT_SECRET"),
                signOptions: {
                    expiresIn: configService.get<string>("PASSWORD_RECOVERY_EXPIRATION")
                }
            })
        })
    ],
    providers: [PasswordRecoveryTokensService],
    exports: [PasswordRecoveryTokensService]
})
export class PasswordRecoveryTokensModule {}
