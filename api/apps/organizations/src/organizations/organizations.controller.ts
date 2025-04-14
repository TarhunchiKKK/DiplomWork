import { Controller } from "@nestjs/common";
import { OrganizationsService } from "./organizations.service";
import {
    ICreateDefaultOrganizationResponse,
    IUpdateAdministrativeDivisionsDto,
    IUpdateDocumentAimsDto,
    IUpdateDocumentTypesDto,
    OrganizationsServiceController,
    OrganizationsServiceControllerMethods,
    StringValue
} from "common/grpc";
import { defaultOrganization } from "./constants/organization.constants";
import { asType, UnknownReturnTypes } from "common/utils";

@Controller()
@OrganizationsServiceControllerMethods()
export class OrganizationsController implements UnknownReturnTypes<OrganizationsServiceController> {
    public constructor(private readonly organizationsService: OrganizationsService) {}

    public async createDefault() {
        const organization = await this.organizationsService.create(defaultOrganization);
        return asType<ICreateDefaultOrganizationResponse>(organization);
    }

    public async findOneById(dto: StringValue) {
        return await this.organizationsService.findOneById(dto.value);
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
