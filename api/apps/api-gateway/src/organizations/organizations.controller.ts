import {
    Body,
    Controller,
    Get,
    Patch,
    Req,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { UpdateAdministrativeDivisionsDto } from "apps/organizations/src/organizations/dto/update-administrative-divisions.dto";
import { UpdateDocumentAimsDto } from "apps/organizations/src/organizations/dto/update-document-aims.dto";
import { UpdateDocumentTypesDto } from "apps/organizations/src/organizations/dto/update-document-types.dto";
import { UpdateUrgencyIntervalDto } from "apps/organizations/src/organizations/dto/update-urgency-interval.dto";
import { Role } from "common/enums";
import { ExtractDataInterceptor, OrganizationsGrpcService } from "common/grpc";
import { AuthenticationGuard, ExtractFromRequest, OrganizationGuard, RequireRoles, RoleGuard } from "common/middleware";
import { OrganizationsControllerApiInfo } from "./swagger/organizations-controller-api-info.decorator";
import { TAuthenticatedRequest } from "common/modules";

@Controller("organizations")
@OrganizationsControllerApiInfo()
export class OrganizationsController {
    public constructor(private readonly organizationsGrpcService: OrganizationsGrpcService) {}

    @Get(":id")
    @UseGuards(AuthenticationGuard)
    @UseInterceptors(ExtractDataInterceptor)
    public async findOneById(@Req() request: TAuthenticatedRequest) {
        return this.organizationsGrpcService.findOneById(request.jwtInfo.organizationId);
    }

    @Patch("urgency-interval")
    @RequireRoles([Role.ADMIN])
    @ExtractFromRequest(request => request.body.organizationId)
    @UseGuards(RoleGuard, OrganizationGuard)
    @UsePipes(ValidationPipe)
    public async updateUrgencyInterval(@Body() dto: UpdateUrgencyIntervalDto) {
        return this.organizationsGrpcService.updateUrgencyInterval(dto);
    }

    @Patch("document-aims")
    @RequireRoles([Role.ADMIN])
    @ExtractFromRequest(request => request.body.organizationId)
    @UseGuards(RoleGuard, OrganizationGuard)
    @UsePipes(ValidationPipe)
    public async updateDocumentAims(@Body() dto: UpdateDocumentAimsDto) {
        return this.organizationsGrpcService.updateDocumentAims(dto);
    }

    @Patch("document-types")
    @RequireRoles([Role.ADMIN])
    @ExtractFromRequest(request => request.body.organizationId)
    @UseGuards(RoleGuard, OrganizationGuard)
    @UsePipes(ValidationPipe)
    public async updateDocumentTypes(@Body() dto: UpdateDocumentTypesDto) {
        return this.organizationsGrpcService.updateDocumenttypes(dto);
    }

    @Patch("administrative-divisions")
    @RequireRoles([Role.ADMIN])
    @ExtractFromRequest(request => request.body.organizationId)
    @UseGuards(RoleGuard, OrganizationGuard)
    @UsePipes(ValidationPipe)
    public async updateAdministrativeDivisions(@Body() dto: UpdateAdministrativeDivisionsDto) {
        return this.organizationsGrpcService.updateAdministrativeDivisions(dto);
    }
}
