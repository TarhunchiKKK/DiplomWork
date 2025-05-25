import { useOneDocument } from "@/entities/documents";
import { useCreateWorkflow } from "@/entities/workflows";

export function useCreateWorkflowButton(documentId: string) {
    const { document } = useOneDocument(documentId);

    const { createWorkflow, isPending } = useCreateWorkflow();

    const onClick = () => {
        createWorkflow({
            documentId: document?.id as string,
            documentTitle: document?.title as string
        });
    };

    return { onClick, disabled: isPending };
}
