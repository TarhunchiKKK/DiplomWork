import { ApprovalStatus, TFullWorkflow } from "@/entities/workflows";

export type TProps = {
    participants: TFullWorkflow["participants"];
};

export type TItem = {
    id: string;

    displayName: string;

    status: ApprovalStatus;
};
