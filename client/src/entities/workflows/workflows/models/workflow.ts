import { WorkflowStatus } from "../enums";

export type TWorkflow = {
    id: string;

    signerId?: string;

    documentId: string;

    documentTitle: string;

    creatorId: string;

    status: WorkflowStatus;
};
