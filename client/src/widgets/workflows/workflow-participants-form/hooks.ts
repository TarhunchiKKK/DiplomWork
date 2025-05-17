import { useForm } from "react-hook-form";
import { TFormState } from "./types";
import { useOrganizationUsers } from "@/entities/users";
import { useFindWorkflowByDocumentId, WorkflowParticipantRole } from "@/entities/workflows";
import { useCurrentDocument } from "@/widgets/documents";
import { useParticipantsStore } from "./store";
import { useEffect } from "react";

export function useParticipantsForm() {
    const form = useForm<TFormState>({
        defaultValues: {
            value: ""
        }
    });

    const onSubmit = form.handleSubmit((data: TFormState) => {
        form.reset();
    });

    return {
        form,
        onSubmit
    };
}

export function useParticipants() {
    const { users } = useOrganizationUsers();
}

export function useSetup() {
    const { documentId } = useCurrentDocument();

    const { workflow } = useFindWorkflowByDocumentId(documentId);

    const { setApprovers, setSigner, reset } = useParticipantsStore();

    useEffect(() => {
        if (workflow) {
            setApprovers(workflow.participants.filter(p => p.role === WorkflowParticipantRole.APPROVER));
            setSigner(workflow.participants.find(p => p.role === WorkflowParticipantRole.SIGNER) ?? null);
        }

        return () => reset();
    }, [workflow, setApprovers, setSigner, reset]);
}
