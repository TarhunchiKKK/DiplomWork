import { Controller, UseInterceptors } from "@nestjs/common";
import { OrganizationsService } from "./organizations.service";
import {
    GrpcNotFoundInterceptor,
    IOrganization,
    IUpdateAdministrativeDivisionsDto,
    IUpdateDocumentAimsDto,
    IUpdateDocumentTypesDto,
    OrganizationsManagementServiceController,
    OrganizationsManagementServiceControllerMethods,
    StringValue
} from "common/grpc";
import { defaultOrganization } from "./constants/organization.constants";
import { asType } from "common/types";
import { UpdateUrgencyIntervalDto } from "./dto/update-urgency-interval.dto";

@Controller()
@OrganizationsManagementServiceControllerMethods()
export class OrganizationsController implements OrganizationsManagementServiceController {
    public constructor(private readonly organizationsService: OrganizationsService) {}

    public async createDefault() {
        const organization = await this.organizationsService.create(defaultOrganization);
        return asType<IOrganization>(organization);
    }

    @UseInterceptors(GrpcNotFoundInterceptor)
    public async findOneById(dto: StringValue) {
        const organization = await this.organizationsService.findOneById(dto.value);
        return asType<{ data: IOrganization[] }>(organization);
    }

    public async updateUrgencyInterval(dto: UpdateUrgencyIntervalDto) {
        await this.organizationsService.updateUrgencyInterval(dto);
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
