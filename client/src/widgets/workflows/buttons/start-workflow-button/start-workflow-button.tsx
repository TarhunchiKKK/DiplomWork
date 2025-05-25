"use client";

import { Button } from "@/shared/ui";
import { useStartWorkflowButton } from "./hooks";
import { TProps } from "./types";

export function StartWorkflowButton({ documentId }: TProps) {
    const buttonProps = useStartWorkflowButton(documentId);

    return (
        <Button className="cursor-pointer" {...buttonProps}>
            Начать
        </Button>
    );
}
