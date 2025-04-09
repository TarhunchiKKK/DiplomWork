import { Module } from "@nestjs/common";
import { UsersGrpcModule } from "common/grpc";
import { UsersController } from "./users.controller";
import { TokensModule } from "common/modules";

@Module({
    imports: [UsersGrpcModule, TokensModule],
    controllers: [UsersController]
})
export class UsersModule {}
