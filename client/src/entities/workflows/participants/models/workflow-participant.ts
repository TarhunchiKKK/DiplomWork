import { WorkflowParticipantRole } from "../enums";

export type TWorkflowParticipant = {
    id: string;

    role: WorkflowParticipantRole;

    userId: string;
};
