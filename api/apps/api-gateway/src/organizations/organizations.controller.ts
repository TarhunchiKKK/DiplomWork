import { Body, Controller, Get, Patch, Req, UseFilters, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Role } from "common/enums";
import { OrganizationsGrpcService } from "common/grpc";
import {
    AuthenticationGuard,
    ExtractFromRequest,
    GatewayExceptionFilter,
    OrganizationGuard,
    RequireRoles,
    RoleGuard
} from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { UpdateDocumentAimsDto } from "./dto/update-document-aims.dto";
import { UpdateDocumentTypesDto } from "./dto/update-document-types.dto";
import { UpdateAdministrativeDivisionsDto } from "./dto/update-administrative-divisions.dto";

@Controller("organizations")
@UseFilters(GatewayExceptionFilter)
export class OrganizationsController {
    public constructor(private readonly organizationsGrpcService: OrganizationsGrpcService) {}

    @Get()
    @UseGuards(AuthenticationGuard)
    public async findOneById(@Req() request: TAuthenticatedRequest) {
        return this.organizationsGrpcService.call("findOneById", { id: request.jwtInfo.organizationId });
    }

    @Patch("document-aims")
    @RequireRoles([Role.ADMIN])
    @ExtractFromRequest(request => request.body.organizationId)
    @UseGuards(RoleGuard, OrganizationGuard)
    @UsePipes(ValidationPipe)
    public async updateDocumentAims(@Body() dto: UpdateDocumentAimsDto) {
        return this.organizationsGrpcService.call("updateDocumentAims", dto);
    }

    @Patch("document-types")
    @RequireRoles([Role.ADMIN])
    @ExtractFromRequest(request => request.body.organizationId)
    @UseGuards(RoleGuard, OrganizationGuard)
    @UsePipes(ValidationPipe)
    public async updateDocumentTypes(@Body() dto: UpdateDocumentTypesDto) {
        return this.organizationsGrpcService.call("updateDocumentTypes", dto);
    }

    @Patch("administrative-divisions")
    @RequireRoles([Role.ADMIN])
    @ExtractFromRequest(request => request.body.organizationId)
    @UseGuards(RoleGuard, OrganizationGuard)
    @UsePipes(ValidationPipe)
    public async updateAdministrativeDivisions(@Body() dto: UpdateAdministrativeDivisionsDto) {
        return this.organizationsGrpcService.call("updateAdministrativeDivisions", dto);
    }
}
