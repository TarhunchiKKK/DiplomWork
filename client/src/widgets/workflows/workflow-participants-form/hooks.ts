import {
    useFindWorkflowByDocumentId,
    useUpdateWorkflowSigner,
    useUpsertWorkflowParticipants
} from "@/entities/workflows";
import { useCurrentDocument } from "@/widgets/documents";
import { useParticipantsStore } from "./store";
import { useEffect } from "react";

export function useSetup() {
    const { documentId } = useCurrentDocument();

    const { workflow } = useFindWorkflowByDocumentId(documentId);

    const { setApprovers, setSignerId, approvers, signerId } = useParticipantsStore();

    useEffect(() => {
        if (workflow) {
            setApprovers(workflow.participants);
            setSignerId(workflow.signerId ?? null);
        }
    }, [workflow, setApprovers, setSignerId]);

    const { upsertParticipants, isPending: areParticipantsPending } = useUpsertWorkflowParticipants();

    const { updateSigner, isPending: isSignerPending } = useUpdateWorkflowSigner();

    const handleSave = () => {
        Promise.all([
            updateSigner({
                workflowId: workflow?.id as string,
                signerId: signerId as string
            }),
            upsertParticipants({
                id: workflow?.id as string,
                participants: approvers
            })
        ]);
    };

    return { onClick: handleSave, disabled: areParticipantsPending || isSignerPending };
}
