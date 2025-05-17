import { DateFieldsToString } from "@/shared/api";
import { TFullWorkflow } from "../models";
import { TApproval } from "../../approvals";

export type TFullWorkflowResponse = TFullWorkflow & {
    approvals: DateFieldsToString<TApproval>[];
};
