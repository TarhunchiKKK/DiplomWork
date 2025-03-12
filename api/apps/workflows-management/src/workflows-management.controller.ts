import { Controller, Get } from "@nestjs/common";
import { WorkflowsManagementService } from "./workflows-management.service";

@Controller()
export class WorkflowsManagementController {
    constructor(private readonly workflowsManagementService: WorkflowsManagementService) {}

    @Get()
    getHello(): string {
        return this.workflowsManagementService.getHello();
    }
}
