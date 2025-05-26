import { useFindWorkflowByDocumentId, useSignWorkflow } from "@/entities/workflows";

export function useSignWorkflowButton(documentId: string) {
    const { data: workflow } = useFindWorkflowByDocumentId(documentId);

    const { mutate: signWorkflow, isPending } = useSignWorkflow();

    const onClick = () => {
        signWorkflow(workflow?.id as string);
    };

    return { onClick, disabled: isPending };
}
