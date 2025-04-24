import { WorkflowParticipantRole } from "../enums/workflow-participant-role.enum";

export interface IUpdateParticipantDto {
    id: string;

    userId: string;

    role: WorkflowParticipantRole;

    workflow: {
        id: string;
    };
}
