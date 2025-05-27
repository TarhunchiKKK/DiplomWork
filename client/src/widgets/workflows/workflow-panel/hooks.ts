import { useFindWorkflowByDocumentId } from "@/entities/workflows";
import { TProfile, useProfileStore } from "@/features/auth";
import { useEffect, useState } from "react";
import { WorkflowRole } from "./enums";
import { useOneDocument } from "@/entities/documents";

export function useWorkflowPanel(documentId: string) {
    const { data: document } = useOneDocument(documentId);

    const { data: workflow, isFetched: isWorkflowFetched } = useFindWorkflowByDocumentId(documentId);

    const profile = useProfileStore(state => state.profile) as TProfile;

    const [userRole, setUserRole] = useState<WorkflowRole | null>(null);

    useEffect(() => {
        if (!isWorkflowFetched) {
            return;
        }

        if (!workflow) {
            if (!document) {
                return;
            }

            if (document.authorId === profile.id) {
                setUserRole(WorkflowRole.CREATOR);
            } else {
                setUserRole(WorkflowRole.APPROVER);
            }

            return;
        }

        if (workflow.creatorId === profile.id) {
            setUserRole(WorkflowRole.CREATOR);
        } else if (workflow.signerId === profile.id) {
            setUserRole(WorkflowRole.SIGNER);
        } else {
            setUserRole(WorkflowRole.APPROVER);
        }
    }, [workflow, profile, document, isWorkflowFetched]);

    return {
        workflow,
        isWorkflowFetched,
        userRole
    };
}
