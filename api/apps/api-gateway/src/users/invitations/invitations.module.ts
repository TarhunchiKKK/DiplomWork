import { Module } from "@nestjs/common";
import { UsersGrpcModule } from "common/grpc";
import { InvitationsController } from "./invitations.controller";
import { JwtTokensModule, UserInvitationTokensModule } from "common/modules";

@Module({
    imports: [UsersGrpcModule, JwtTokensModule, UserInvitationTokensModule],
    controllers: [InvitationsController]
})
export class InvitationsModule {}
