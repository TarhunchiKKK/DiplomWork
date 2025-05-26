"use client";

import { Button, CenteredChild, CenteredChildParent } from "@/shared/ui";
import { useCreateWorkflowButton } from "./hooks";
import { TProps } from "./types";

export function CreateWorkflowButton({ documentId }: TProps) {
    const buttonProps = useCreateWorkflowButton(documentId);

    return (
        <CenteredChildParent className="h-full">
            <CenteredChild>
                <Button className="cursor-pointer" {...buttonProps}>
                    Создать
                </Button>
            </CenteredChild>
        </CenteredChildParent>
    );
}
