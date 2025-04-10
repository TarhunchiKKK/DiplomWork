import { Module } from "@nestjs/common";
import { UsersGrpcModule } from "common/grpc";
import { AuthController } from "./auth.controller";

@Module({
    imports: [UsersGrpcModule],
    controllers: [AuthController]
})
export class AuthModule {}
