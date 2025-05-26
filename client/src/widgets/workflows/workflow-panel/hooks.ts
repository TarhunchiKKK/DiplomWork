import { TFullWorkflow, useFindWorkflowByDocumentId, WorkflowStatus } from "@/entities/workflows";
import { TProfile, useProfileStore } from "@/features/auth";
import { useEffect, useState } from "react";
import { WorkflowRole } from "./enums";

const workflow: TFullWorkflow = {
    id: "1",
    creatorId: "1",
    documentId: "1",
    documentTitle: "Document",
    status: WorkflowStatus.DEFAULT,
    participants: []
};

export function useWorkflowPanel(documentId: string) {
    // const { data: workflow, isLoading } = useFindWorkflowByDocumentId(documentId);

    const profile = useProfileStore(state => state.profile) as TProfile;

    const [userRole, setUserRole] = useState<WorkflowRole | null>(null);

    useEffect(() => {
        if (!workflow) {
            return;
        }

        if (workflow.creatorId === profile.id) {
            setUserRole(WorkflowRole.CREATOR);
        } else if (workflow.signerId === profile.id) {
            setUserRole(WorkflowRole.SIGNER);
        } else {
            setUserRole(WorkflowRole.APPROVER);
        }
    }, [workflow, profile]);

    return {
        workflow,
        isLoading: false,
        userRole
    };
}
