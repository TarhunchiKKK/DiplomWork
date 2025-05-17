import { ApprovalStatus } from "../enums";

export type TWorkflowParticipant = {
    id: string;

    userId: string;

    approvalStatus: ApprovalStatus;
};
