import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { getJwtConfig } from "common/config";
import { JwtTokensService } from "./services/jwt-tokens.service";
import { TokensService } from "./services/tokens.service";
import { UserInvitationTokensService } from "./services/users-invitation-tokens.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getJwtConfig
        })
    ],
    providers: [
        {
            provide: JwtTokensService.INJECTION_TOKEN,
            useClass: JwtTokensService
        },
        {
            provide: UserInvitationTokensService.INJECTION_TOKEN,
            useClass: UserInvitationTokensService
        },
        TokensService
    ],
    exports: [TokensService]
})
export class TokensModule {}
