import { Module } from "@nestjs/common";
import { UsersGrpcModule } from "common/grpc";
import { AuthController } from "./auth.controller";
import { JwtTokensModule } from "common/modules";
import { TotpModule } from "./totp/totp.module";

@Module({
    imports: [UsersGrpcModule, JwtTokensModule, TotpModule],
    controllers: [AuthController]
})
export class AuthModule {}
