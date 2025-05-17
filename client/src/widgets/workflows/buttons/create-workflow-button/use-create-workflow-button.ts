import { useCreateWorkflow } from "@/entities/workflows";
import { useCurrentDocument } from "@/widgets/documents";

export function useCreateWorkflowButton() {
    const { document } = useCurrentDocument();

    const { createWorkflow, isPending } = useCreateWorkflow();

    const onClick = () => {
        createWorkflow({
            documentId: document?.id as string,
            documentTitle: document?.title as string
        });
    };

    return { onClick, disabled: isPending };
}
