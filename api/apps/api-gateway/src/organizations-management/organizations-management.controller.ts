import { Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { ExtractDataInterceptor, OrganizationsManagementGrpcService } from "common/grpc";

@Controller("organizations")
export class OrganizationsManagementController {
    public constructor(private readonly organizationsManagementGrpcService: OrganizationsManagementGrpcService) {}

    @Post("/test")
    public async create() {
        return this.organizationsManagementGrpcService.createDefault();
    }

    @Get(":id")
    @UseInterceptors(ExtractDataInterceptor)
    public async findOneById(@Param("id") organizationId: string) {
        return this.organizationsManagementGrpcService.findOneById(organizationId);
    }
}
