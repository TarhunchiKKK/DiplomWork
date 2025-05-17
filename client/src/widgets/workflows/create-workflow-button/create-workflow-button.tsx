"use client";

import { Button } from "@/shared/ui";
import { Plus } from "lucide-react";
import { useCreateWorkflowButton } from "./use-create-workflow-button";

export function CreateWorkflowButton() {
    const buttonProps = useCreateWorkflowButton();

    return (
        <Button variant="outline" size="icon" title="Создать" className="cursor-pointer" {...buttonProps}>
            <Plus />
        </Button>
    );
}
