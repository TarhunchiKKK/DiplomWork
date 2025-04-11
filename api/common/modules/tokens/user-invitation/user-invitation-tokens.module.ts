import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserInvitationTokensService } from "./users-invitation-tokens.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>("USR_INVITATION_JWT_SECRET"),
                signOptions: {
                    expiresIn: configService.get<string>("USER_INVITATION_JWT_EXPIRATION")
                }
            })
        })
    ],
    providers: [UserInvitationTokensService],
    exports: [UserInvitationTokensService]
})
export class UserInvitationTokensModule {}
