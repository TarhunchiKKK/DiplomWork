"use client";

import { Button } from "@/shared/ui";
import { useStartWorkflowButton } from "./hooks";

export function StartWorkflowButton() {
    const buttonProps = useStartWorkflowButton();

    return (
        <Button className="cursor-pointer" {...buttonProps}>
            Начать
        </Button>
    );
}
