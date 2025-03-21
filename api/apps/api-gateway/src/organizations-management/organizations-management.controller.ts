import { Controller, Post } from "@nestjs/common";
import { OrganizationsManagementGrpcService } from "common/grpc";

@Controller("organizations")
export class OrganizationsManagementController {
    public constructor(private readonly organizationsManagementGrpcService: OrganizationsManagementGrpcService) {}

    @Post("/test")
    public async create() {
        return this.organizationsManagementGrpcService.createDefault();
    }
}
