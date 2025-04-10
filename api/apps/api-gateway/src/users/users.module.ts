import { Module } from "@nestjs/common";
import { UsersGrpcModule } from "common/grpc";
import { UsersController } from "./users.controller";
import { JwtTokensModule, PasswordRecoveryTokensModule, UserInvitationTokensModule } from "common/modules";
import { InvitationsModule } from "./invitations/invitations.module";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [
        UsersGrpcModule,
        JwtTokensModule,
        UserInvitationTokensModule,
        PasswordRecoveryTokensModule,
        AuthModule,
        InvitationsModule
    ],
    controllers: [UsersController]
})
export class UsersModule {}
