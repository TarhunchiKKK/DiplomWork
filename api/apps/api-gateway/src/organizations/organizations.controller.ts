import { Body, Controller, Get, Patch, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Role } from "common/enums";
import { OrganizationsGrpcService } from "common/grpc";
import { AuthenticationGuard, ExtractFromRequest, OrganizationGuard, RequireRoles, RoleGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { UpdateDocumentAimsDto } from "./dto/update-document-aims.dto";
import { UpdateDocumentTypesDto } from "./dto/update-document-types.dto";
import { UpdateAdministrativeDivisionsDto } from "./dto/update-administrative-divisions.dto";

@Controller("organizations")
export class OrganizationsController {
    public constructor(private readonly organizationsGrpcService: OrganizationsGrpcService) {}

    @Get(":id")
    @UseGuards(AuthenticationGuard)
    public async findOneById(@Req() request: TAuthenticatedRequest) {
        return this.organizationsGrpcService.call("findOneById", { value: request.jwtInfo.organizationId });
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
