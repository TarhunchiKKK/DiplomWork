import { Module } from "@nestjs/common";
import { UsersGrpcModule } from "common/grpc";
import { AuthController } from "./auth.controller";
import { TokensModule } from "common/modules";

@Module({
    imports: [UsersGrpcModule, TokensModule],
    controllers: [AuthController]
})
export class AuthModule {}
