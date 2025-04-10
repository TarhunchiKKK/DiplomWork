import { Module } from "@nestjs/common";
import { UsersGrpcModule } from "common/grpc";
import { InvitationsController } from "./invitations.controller";
import { TokensModule } from "common/modules";

@Module({
    imports: [UsersGrpcModule, TokensModule],
    controllers: [InvitationsController]
})
export class InvitationsModule {}
