import { useStartWorkflow } from "@/entities/workflows";
import { useCurrentDocument } from "@/widgets/documents";

export function useStartWorkflowButton() {
    const { documentId } = useCurrentDocument();

    const { startWorkflow, isPending } = useStartWorkflow();

    const onClick = () => {
        startWorkflow(documentId as string);
    };

    return {
        onClick,
        disabled: isPending
    };
}
