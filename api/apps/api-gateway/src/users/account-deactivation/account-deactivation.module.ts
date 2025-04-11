import { Module } from "@nestjs/common";
import { AccountDeactivationController } from "./account-deactivation.controller";
import { UsersGrpcModule } from "common/grpc";
import { JwtTokensModule } from "common/modules";

@Module({
    imports: [UsersGrpcModule, JwtTokensModule],
    controllers: [AccountDeactivationController]
})
export class AccountDeactivationModule {}
