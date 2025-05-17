import { ApprovalStatus } from "@/entities/workflows";

export type TItem = {
    id: string;

    displayName: string;

    status: ApprovalStatus;
};
