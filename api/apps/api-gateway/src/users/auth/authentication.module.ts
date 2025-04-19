import { Module } from "@nestjs/common";
import { UsersGrpcModule } from "common/grpc";
import { AuthenticationController } from "./authentication.controller";
import { JwtTokensModule } from "common/modules";
import { TotpAuthenticationModule } from "./totp/totp-authentication.module";

@Module({
    imports: [UsersGrpcModule, JwtTokensModule, TotpAuthenticationModule],
    controllers: [AuthenticationController]
})
export class AuthenticationModule {}
