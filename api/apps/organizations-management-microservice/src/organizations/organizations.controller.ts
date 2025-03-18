import { Controller, Post } from "@nestjs/common";
import { OrganizationsService } from "./organizations.service";

@Controller("organizations")
export class OrganizationsController {
    public constructor(private readonly organizationsService: OrganizationsService) {}

    @Post("/test")
    public test() {
        return this.organizationsService.create({
            settings: {
                urgencyInterval: 100,
                documentStatuses: [],
                documentTypes: []
            }
        });
    }
}
