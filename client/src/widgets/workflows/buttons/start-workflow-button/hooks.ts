import { useStartWorkflow } from "@/entities/workflows";

export function useStartWorkflowButton(documentId: string) {
    const { mutate: startWorkflow, isPending } = useStartWorkflow();

    const onClick = () => {
        startWorkflow(documentId as string);
    };

    return {
        onClick,
        disabled: isPending
    };
}
