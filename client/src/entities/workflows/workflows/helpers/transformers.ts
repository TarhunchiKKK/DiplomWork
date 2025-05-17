import { TFullWorkflow } from "../models";
import { transformApproval } from "../../approvals/helpers";
import { TFullWorkflowResponse } from "../types";

export function transformFullWorkflow(data: TFullWorkflowResponse): TFullWorkflow {
    return {
        ...data,
        approvals: data.approvals.map(transformApproval)
    };
}
