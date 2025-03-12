import { Controller, Get } from "@nestjs/common";
import { OrganizationsManagementService } from "./organizations-management.service";

@Controller()
export class OrganizationsManagementController {
    constructor(private readonly organizationsManagementService: OrganizationsManagementService) {}

    @Get()
    getHello(): string {
        return this.organizationsManagementService.getHello();
    }
}
