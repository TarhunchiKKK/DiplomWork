import { TFullWorkflowParticipant } from "../../participants";
import { TWorkflow } from "./workflow";

export type TFullWorkflow = TWorkflow & {
    participants: TFullWorkflowParticipant[];
};
