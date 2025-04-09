import { Module } from "@nestjs/common";
import { UsersGrpcModule } from "common/grpc";
import { UsersController } from "./users.controller";

@Module({
    imports: [UsersGrpcModule],
    controllers: [UsersController]
})
export class UsersModule {}
