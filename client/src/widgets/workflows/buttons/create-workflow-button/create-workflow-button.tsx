"use client";

import { Button } from "@/shared/ui";
import { useCreateWorkflowButton } from "./use-create-workflow-button";

export function CreateWorkflowButton() {
    const buttonProps = useCreateWorkflowButton();

    return (
        <Button className="cursor-pointer" {...buttonProps}>
            Создать
        </Button>
    );
}
