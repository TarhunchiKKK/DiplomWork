import { Controller } from "@nestjs/common";
import { OrganizationsService } from "./organizations.service";
import {
    ICreateOrganizationReponse,
    OrganizationsManagementServiceController,
    OrganizationsManagementServiceControllerMethods
} from "common/grpc";
import { defaulttOrganization } from "./constants/organization.constants";

@Controller("organizations")
@OrganizationsManagementServiceControllerMethods()
export class OrganizationsController implements OrganizationsManagementServiceController {
    public constructor(private readonly organizationsService: OrganizationsService) {}

    public async createDefault() {
        const organization = await this.organizationsService.create(defaulttOrganization);
        return organization as unknown as ICreateOrganizationReponse;
    }
}
