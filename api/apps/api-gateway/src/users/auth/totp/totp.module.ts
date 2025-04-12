import { Module } from "@nestjs/common";
import { UsersGrpcModule } from "common/grpc";
import { JwtTokensModule } from "common/modules";
import { TotpController } from "./totp.controller";

@Module({
    imports: [UsersGrpcModule, JwtTokensModule],
    controllers: [TotpController]
})
export class TotpModule {}
