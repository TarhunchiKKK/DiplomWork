import { WorkflowParticipantRole } from "../enums/workflow-participant-role.enum";

export interface ICreateParticipantDto {
    userId: string;

    role: WorkflowParticipantRole;

    workflow: {
        id: string;
    };
}
