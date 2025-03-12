import { Injectable } from "@nestjs/common";

@Injectable()
export class WorkflowsManagementService {
    getHello(): string {
        return "Hello World!";
    }
}
