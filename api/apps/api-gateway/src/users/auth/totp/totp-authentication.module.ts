import { Module } from "@nestjs/common";
import { UsersGrpcModule } from "common/grpc";
import { JwtTokensModule } from "common/modules";
import { TotpAuthenticationController } from "./totp-authentication.controller";

@Module({
    imports: [UsersGrpcModule, JwtTokensModule],
    controllers: [TotpAuthenticationController]
})
export class TotpAuthenticationModule {}
