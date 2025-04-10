import { Module } from "@nestjs/common";
import { UsersGrpcModule } from "common/grpc";
import { UsersController } from "./users.controller";
import { TokensModule } from "common/modules";
import { InvitationsModule } from "./invitations/invitations.module";
import { AuthModule } from "./auth/auth.module";

@Module({
    imports: [UsersGrpcModule, TokensModule, AuthModule, InvitationsModule],
    controllers: [UsersController]
})
export class UsersModule {}
