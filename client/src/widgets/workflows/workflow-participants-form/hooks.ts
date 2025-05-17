import { useFindWorkflowByDocumentId } from "@/entities/workflows";
import { useCurrentDocument } from "@/widgets/documents";
import { useParticipantsStore } from "./store";
import { useEffect } from "react";

export function useSetup() {
    const { documentId } = useCurrentDocument();

    const { workflow } = useFindWorkflowByDocumentId(documentId);

    const { setApprovers, setSignerId } = useParticipantsStore();

    useEffect(() => {
        if (workflow) {
            // setApprovers(workflow.participants);
            // setSignerId(workflow.signerId ?? null);
        }
    }, [workflow, setApprovers, setSignerId]);
}
