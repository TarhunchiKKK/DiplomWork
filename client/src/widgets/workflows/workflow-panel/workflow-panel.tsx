"use client";

import { TagsCloudSkeleton } from "@/shared/ui";
import { TProps } from "./types";
import { useWorkflowPanel } from "./hooks";
import { WorkflowRole } from "./enums";
import { CreatorPanel, ApproverPanel, SignerPanel } from "./ui";

export function WorkflowPanel({ documentId }: TProps) {
    const { workflow, isWorkflowFetched, userRole } = useWorkflowPanel(documentId);

    if (!isWorkflowFetched) {
        return <></>;
    }

    switch (userRole) {
        case WorkflowRole.CREATOR:
            return <CreatorPanel workflow={workflow} documentId={documentId} />;
        case WorkflowRole.APPROVER:
            return <ApproverPanel workflow={workflow} documentId={documentId} />;
        case WorkflowRole.SIGNER:
            return <SignerPanel workflow={workflow} />;
    }
}

export function WorkflowPanelSkeleton() {
    return <TagsCloudSkeleton />;
}
