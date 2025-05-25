import { useFindWorkflowByDocumentId, useSignWorkflow } from "@/entities/workflows";

export function useSignWorkflowButton(documentId: string) {
    const { workflow } = useFindWorkflowByDocumentId(documentId);

    const { signWorkflow, isPending } = useSignWorkflow();

    const onClick = () => {
        signWorkflow(workflow?.id as string);
    };

    return { onClick, disabled: isPending };
}
