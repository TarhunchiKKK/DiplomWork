import { Module } from "@nestjs/common";
import { WorkflowsManagementController } from "./workflows-management.controller";
import { WorkflowsManagementService } from "./workflows-management.service";

@Module({
    imports: [],
    controllers: [WorkflowsManagementController],
    providers: [WorkflowsManagementService]
})
export class WorkflowsManagementModule {}
