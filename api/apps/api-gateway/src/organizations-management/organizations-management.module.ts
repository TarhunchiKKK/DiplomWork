import { Module } from "@nestjs/common";
import { OrganizationsManagementGrpcModule } from "common/grpc";
import { OrganizationsManagementController } from "./organizations-management.controller";

@Module({
    imports: [OrganizationsManagementGrpcModule],
    controllers: [OrganizationsManagementController]
})
export class OrganizationsManagementModule {}
