import { Module } from "@nestjs/common";
import { UsersGrpcModule } from "common/grpc";
import { AuthController } from "./auth.controller";
import { JwtTokensModule } from "common/modules";

@Module({
    imports: [UsersGrpcModule, JwtTokensModule],
    controllers: [AuthController]
})
export class AuthModule {}
