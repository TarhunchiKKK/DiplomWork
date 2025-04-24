import { WorkflowStatus } from "../enums/workflow-status.enum";

export class UpdateWorkflowDto {
    public status?: WorkflowStatus;

    public completedAt?: Date;
}
