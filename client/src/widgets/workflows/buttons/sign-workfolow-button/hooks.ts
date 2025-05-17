import { useFindWorkflowByDocumentId, useSignWorkflow } from "@/entities/workflows";
import { useCurrentDocument } from "@/widgets/documents";

export function useSignWorkflowButton() {
    const { documentId } = useCurrentDocument();

    const { workflow } = useFindWorkflowByDocumentId(documentId);

    const { signWorkflow, isPending } = useSignWorkflow();

    const onClick = () => {
        signWorkflow(workflow?.id as string);
    };

    return { onClick, disabled: isPending };
}
