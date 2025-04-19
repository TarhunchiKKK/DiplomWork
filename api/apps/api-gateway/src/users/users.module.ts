import { Module } from "@nestjs/common";
import { UsersGrpcModule } from "common/grpc";
import { UsersController } from "./users.controller";
import { JwtTokensModule, PasswordRecoveryTokensModule, UserInvitationTokensModule } from "common/modules";
import { InvitationsModule } from "./invitations/invitations.module";
import { AuthenticationModule } from "./auth/authentication.module";
import { PasswordRecoveryModule } from "./password-recovery/password-recovery.module";
import { AccountDeactivationModule } from "./account-deactivation/account-deactivation.module";

@Module({
    imports: [
        UsersGrpcModule,
        JwtTokensModule,
        UserInvitationTokensModule,
        PasswordRecoveryTokensModule,
        AuthenticationModule,
        InvitationsModule,
        PasswordRecoveryModule,
        AccountDeactivationModule
    ],
    controllers: [UsersController]
})
export class UsersModule {}
