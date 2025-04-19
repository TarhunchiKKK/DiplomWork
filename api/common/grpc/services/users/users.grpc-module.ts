import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientsModule } from "@nestjs/microservices";
import { getGrpcConfig } from "common/config";
import { USERS_PACKAGE_NAME } from "common/grpc";
import { AuthenticationGrpcService } from "./services/authentication.grpc-service";
import { UsersInvitationGrpcService } from "./services/users-invitation.grpc-service";
import { PasswordRecoveryGrpcService } from "./services/password-recovery.grpc-service";
import { AccountDeactivationGrpcService } from "./services/account-deactivation.grpc-service";
import { TotpAuthenticationGrpcService } from "./services/totp-authentication.grpc-service";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: USERS_PACKAGE_NAME,
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => getGrpcConfig(configService, USERS_PACKAGE_NAME)
            }
        ])
    ],
    providers: [
        AuthenticationGrpcService,
        UsersInvitationGrpcService,
        PasswordRecoveryGrpcService,
        AccountDeactivationGrpcService,
        TotpAuthenticationGrpcService
    ],
    exports: [
        AuthenticationGrpcService,
        UsersInvitationGrpcService,
        PasswordRecoveryGrpcService,
        AccountDeactivationGrpcService,
        TotpAuthenticationGrpcService
    ]
})
export class UsersGrpcModule {}
