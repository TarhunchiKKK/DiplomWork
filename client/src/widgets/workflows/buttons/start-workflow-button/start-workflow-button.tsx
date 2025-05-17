"use client";

import { Button } from "@/shared/ui";
import { useStartWorkflowButton } from "./hooks";

export function StartWorkflowButton() {
    const buttonProps = useStartWorkflowButton();

    return (
        <Button variant="outline" className="cursor-pointer" {...buttonProps}>
            Начать
        </Button>
    );
}
