import { Module } from "@nestjs/common";
import { JwtTokensModule, PasswordRecoveryTokensModule } from "common/modules";
import { UsersGrpcModule } from "common/grpc";
import { PasswordRecoveryController } from "./password-recovery.controller";

@Module({
    imports: [UsersGrpcModule, JwtTokensModule, PasswordRecoveryTokensModule],
    controllers: [PasswordRecoveryController]
})
export class PasswordRecoveryModule {}
