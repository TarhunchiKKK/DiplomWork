import { WorkflowStatus } from "../enums/workflow-status.enum";

export class UpdateWorkflowDto {
    public title?: string;

    public status?: WorkflowStatus;

    public completedAt?: Date;

    public signerId?: string;
}
