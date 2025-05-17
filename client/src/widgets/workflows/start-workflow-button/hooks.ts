import { useCurrentVersionStore } from "@/entities/documents";
import { useStartWorkflow } from "@/entities/workflows";

export function useStartWorkflowButton() {
    const documentId = useCurrentVersionStore(state => state.documentId);

    const { startWorkflow, isPending } = useStartWorkflow();

    const onClick = () => {
        startWorkflow(documentId as string);
    };

    return {
        onClick,
        disabled: isPending
    };
}
