"use client";

import { Button } from "@/shared/ui";
import { useCreateWorkflowButton } from "./hooks";
import { TProps } from "./types";

export function CreateWorkflowButton({ documentId }: TProps) {
    const buttonProps = useCreateWorkflowButton(documentId);

    return (
        <Button className="cursor-pointer" {...buttonProps}>
            Создать
        </Button>
    );
}
