import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { OrganizationsService } from "./organizations.service";
import {
    GrpcExceptionFilter,
    ICreateDefaultOrganizationResponse,
    IFindOneOrganizationResponse,
    InsertGrpcResponseInterceptor,
    IUpdateAdministrativeDivisionsDto,
    IUpdateDocumentAimsDto,
    IUpdateDocumentTypesDto,
    OrganizationsServiceController,
    OrganizationsServiceControllerMethods,
    StringValue,
    UnwrapGrpcResponse
} from "common/grpc";
import { defaultOrganization } from "./constants/organization.constants";
import { asType } from "common/utils";

@UseFilters(GrpcExceptionFilter)
@UseInterceptors(InsertGrpcResponseInterceptor)
@Controller()
@OrganizationsServiceControllerMethods()
export class OrganizationsController implements UnwrapGrpcResponse<OrganizationsServiceController> {
    public constructor(private readonly organizationsService: OrganizationsService) {}

    public async createDefault() {
        const organization = await this.organizationsService.create(defaultOrganization);
        return asType<ICreateDefaultOrganizationResponse["data"]>(organization);
    }

    public async findOneById(dto: StringValue) {
        const data = await this.organizationsService.findOneById(dto.value);
        return asType<IFindOneOrganizationResponse["data"]>(data);
    }

    public async updateDocumentAims(dto: IUpdateDocumentAimsDto) {
        await this.organizationsService.updateDocumentAims(dto);
    }

    public async updateDocumentTypes(dto: IUpdateDocumentTypesDto) {
        await this.organizationsService.updateDocumentTypes(dto);
    }

    public async updateAdministrativeDivisions(dto: IUpdateAdministrativeDivisionsDto) {
        await this.organizationsService.updateAdministrativeDivisions(dto);
    }
}
