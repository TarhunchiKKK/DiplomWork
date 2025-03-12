import { Module } from "@nestjs/common";
import { OrganizationsManagementController } from "./organizations-management.controller";
import { OrganizationsManagementService } from "./organizations-management.service";

@Module({
    imports: [],
    controllers: [OrganizationsManagementController],
    providers: [OrganizationsManagementService]
})
export class OrganizationsManagementModule {}
