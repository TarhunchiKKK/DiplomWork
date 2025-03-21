import { Controller, UseInterceptors } from "@nestjs/common";
import { OrganizationsService } from "./organizations.service";
import {
    GrpcNotFoundInterceptor,
    IOrganization,
    OrganizationsManagementServiceController,
    OrganizationsManagementServiceControllerMethods,
    StringValue
} from "common/grpc";
import { defaultOrganization } from "./constants/organization.constants";
import { asType } from "common/types";

@Controller("organizations")
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
}
