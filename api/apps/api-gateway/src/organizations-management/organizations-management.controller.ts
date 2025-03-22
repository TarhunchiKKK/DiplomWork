import { Body, Controller, Get, Param, Patch, UseInterceptors } from "@nestjs/common";
import { UpdateAdministrativeDivisionsDto } from "apps/organizations-management-microservice/src/organizations/dto/update-administrative-divisions.dto";
import { UpdateDocumentAimsDto } from "apps/organizations-management-microservice/src/organizations/dto/update-document-aims.dto";
import { UpdateDocumentTypesDto } from "apps/organizations-management-microservice/src/organizations/dto/update-document-types.dto";
import { ExtractDataInterceptor, OrganizationsManagementGrpcService } from "common/grpc";

@Controller("organizations")
export class OrganizationsManagementController {
    public constructor(private readonly organizationsManagementGrpcService: OrganizationsManagementGrpcService) {}

    @Get(":id")
    @UseInterceptors(ExtractDataInterceptor)
    public async findOneById(@Param("id") organizationId: string) {
        return this.organizationsManagementGrpcService.findOneById(organizationId);
    }

    @Patch("document-aims")
    public async updateDocumentAims(@Body() dto: UpdateDocumentAimsDto) {
        return this.organizationsManagementGrpcService.updateDocumentAims(dto);
    }

    @Patch("document-types")
    public async updateDocumenttypes(@Body() dto: UpdateDocumentTypesDto) {
        return this.organizationsManagementGrpcService.updateDocumenttypes(dto);
    }

    @Patch("administrative-divisions")
    public async updateAdministrativeDivisions(@Body() dto: UpdateAdministrativeDivisionsDto) {
        return this.organizationsManagementGrpcService.updateAdministrativeDivisions(dto);
    }
}
