import { TWorkflowParticipant } from "../../participants";
import { TWorkflow } from "./workflow";

export type TFullWorkflow = TWorkflow & {
    participants: TWorkflowParticipant[];
};
