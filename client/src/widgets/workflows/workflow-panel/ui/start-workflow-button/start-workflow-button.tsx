"use client";

import { Button, CenteredChild, CenteredChildParent } from "@/shared/ui";
import { TProps } from "./types";
import { useStartWorkflow } from "@/entities/workflows";

export function StartWorkflowButton({ workflowId }: TProps) {
    const { mutate: startWorkflow, isPending } = useStartWorkflow();

    const onClick = () => {
        startWorkflow(workflowId);
    };

    return (
        <CenteredChildParent>
            <CenteredChild>
                <Button className="cursor-pointer" disabled={isPending} onClick={onClick}>
                    Начать
                </Button>
            </CenteredChild>
        </CenteredChildParent>
    );
}
