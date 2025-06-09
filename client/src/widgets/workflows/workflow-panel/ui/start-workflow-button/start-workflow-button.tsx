"use client";

import { Button } from "@/shared/ui";
import { TProps } from "./types";
import { useStartWorkflow } from "@/entities/workflows";

export function StartWorkflowButton({ documentId, workflowId }: TProps) {
    const { mutate: startWorkflow, isPending } = useStartWorkflow();

    const onClick = () => {
        startWorkflow({ documentId, workflowId });
    };

    return (
        <Button className="cursor-pointer" disabled={isPending} onClick={onClick}>
            Начать
        </Button>
    );
}
