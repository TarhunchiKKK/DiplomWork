import { WorkflowParticipantRole } from "../enums/workflow-participant-role.enum";

export interface ISaveParticipantDto {
    id?: string;

    userId: string;

    role: WorkflowParticipantRole;
}
