import { Injectable } from "@nestjs/common";

@Injectable()
export class OrganizationsManagementService {
    getHello(): string {
        return "Hello World!";
    }
}
