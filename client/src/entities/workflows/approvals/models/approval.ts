import { ApprovalStatus } from "../enums";

export type TApproval = {
    id: string;

    status: ApprovalStatus;

    createdAt: Date;

    updatedAt?: Date;
};
