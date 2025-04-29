import { Approval } from "../entities/workflow-approval.entity";

export const transformApproval = (approval: Approval) => {
    return {
        ...approval,
        createdAt: approval.createdAt.toISOString(),
        updatedAt: approval.updatedAt.toISOString()
    };
};
