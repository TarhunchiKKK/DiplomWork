import { DateFieldsToString } from "@/shared/api";
import { TFullWorkflow } from "../models";
import { TFullWorkflowParticipant } from "../../participants";

export type TFullWorkflowResponse = TFullWorkflow & {
    participants: DateFieldsToString<TFullWorkflowParticipant>;
};
