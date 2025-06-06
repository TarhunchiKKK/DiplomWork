import {
    useFindWorkflowByDocumentId,
    useUpdateWorkflowSigner,
    useUpsertWorkflowParticipants
} from "@/entities/workflows";
import { useParticipantsStore } from "./store";
import { useEffect } from "react";

export function useSetup(documentId: string) {
    const { data: workflow } = useFindWorkflowByDocumentId(documentId);

    const { setApprovers, setSignerId, approvers, signerId, setCreatorId } = useParticipantsStore();

    useEffect(() => {
        if (workflow) {
            setApprovers(workflow.participants || []);
            setSignerId(workflow.signerId ?? null);
            setCreatorId(workflow.creatorId);
        }
    }, [workflow, setApprovers, setSignerId, setCreatorId]);

    const { mutate: upsertParticipants, isPending: areParticipantsPending } = useUpsertWorkflowParticipants();

    const { mutate: updateSigner, isPending: isSignerPending } = useUpdateWorkflowSigner();

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
