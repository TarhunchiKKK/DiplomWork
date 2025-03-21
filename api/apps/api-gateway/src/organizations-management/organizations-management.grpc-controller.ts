import { Controller, Post } from "@nestjs/common";
import { OrganizationsManagementGrpcService } from "./organizations-management.grpc-service";

@Controller("organizations")
export class OrganizationsManagementGrpcController {
    public constructor(private readonly organizationsManagementGrpcService: OrganizationsManagementGrpcService) {}

    @Post("/test")
    public async create() {
        return this.organizationsManagementGrpcService.createDefault();
    }
}
