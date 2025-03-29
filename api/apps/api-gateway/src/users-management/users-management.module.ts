import { Module } from "@nestjs/common";
import { UsersManagementGrpcModule } from "common/grpc";
import { UsersManagementController } from "./users-management.controller";

@Module({
    imports: [UsersManagementGrpcModule],
    controllers: [UsersManagementController]
})
export class UsersManagementModule {}
