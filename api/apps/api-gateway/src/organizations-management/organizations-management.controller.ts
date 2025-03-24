import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { UpdateAdministrativeDivisionsDto } from "apps/organizations-management-microservice/src/organizations/dto/update-administrative-divisions.dto";
import { UpdateDocumentAimsDto } from "apps/organizations-management-microservice/src/organizations/dto/update-document-aims.dto";
import { UpdateDocumentTypesDto } from "apps/organizations-management-microservice/src/organizations/dto/update-document-types.dto";
import { UpdateUrgencyIntervalDto } from "apps/organizations-management-microservice/src/organizations/dto/update-urgency-interval.dto";
import { Role } from "common/enums";
import { ExtractDataInterceptor, OrganizationsManagementGrpcService } from "common/grpc";
import { ExtractFromRequest, OrganizationRoleGuard, RequireRoles } from "common/middleware";

@Controller("organizations")
export class OrganizationsManagementController {
    public constructor(private readonly organizationsManagementGrpcService: OrganizationsManagementGrpcService) {}

    @Get(":id")
    @UseInterceptors(ExtractDataInterceptor)
    public async findOneById(@Param("id") organizationId: string) {
        return this.organizationsManagementGrpcService.findOneById(organizationId);
    }

    @Patch("urgency-interval")
    @RequireRoles([Role.ADMIN])
    @ExtractFromRequest(request => request.body.organizationId)
    @UseGuards(OrganizationRoleGuard)
    @UsePipes(ValidationPipe)
    public async updateUrgencyInterval(@Body() dto: UpdateUrgencyIntervalDto) {
        return this.organizationsManagementGrpcService.updateUrgencyInterval(dto);
    }

    @Patch("document-aims")
    @RequireRoles([Role.ADMIN])
    @ExtractFromRequest(request => request.body.organizationId)
    @UseGuards(OrganizationRoleGuard)
    @UsePipes(ValidationPipe)
    public async updateDocumentAims(@Body() dto: UpdateDocumentAimsDto) {
        return this.organizationsManagementGrpcService.updateDocumentAims(dto);
    }

    @Patch("document-types")
    @RequireRoles([Role.ADMIN])
    @ExtractFromRequest(request => request.body.organizationId)
    @UseGuards(OrganizationRoleGuard)
    @UsePipes(ValidationPipe)
    public async updateDocumentTypes(@Body() dto: UpdateDocumentTypesDto) {
        return this.organizationsManagementGrpcService.updateDocumenttypes(dto);
    }

    @Patch("administrative-divisions")
    @RequireRoles([Role.ADMIN])
    @ExtractFromRequest(request => request.body.organizationId)
    @UseGuards(OrganizationRoleGuard)
    @UsePipes(ValidationPipe)
    public async updateAdministrativeDivisions(@Body() dto: UpdateAdministrativeDivisionsDto) {
        return this.organizationsManagementGrpcService.updateAdministrativeDivisions(dto);
    }
}
