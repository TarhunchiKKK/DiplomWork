import { TApproval } from "../../approvals";
import { TWorkflowParticipant } from "./workflow-participant";

export type TFullWorkflowParticipant = TWorkflowParticipant & {
    approval: TApproval;
};
