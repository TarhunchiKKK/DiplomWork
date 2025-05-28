"use client";

import { Button } from "@/shared/ui";
import { ApproversForm, ApproversFormSkeleton } from "./approvers-form";
import { ApproversList, ApproversListSkeleton } from "./approvers-list";
import { useSetup } from "./hooks";
import { SignerDropdown } from "./signer-dropdown";
import { TProps } from "./types";

export function WorkflowParticipantsForm({ documentId }: TProps) {
    const buttonProps = useSetup(documentId);

    return (
        <div className="h-full flex flex-col justify-between gap-4">
            <div className="space-y-4">
                <ApproversForm />

                <div>
                    <h3 className="mb-2">Участники:</h3>

                    <ApproversList />
                </div>

                <div>
                    <h3 className="mb-2">Подписывающий:</h3>

                    <SignerDropdown />
                </div>
            </div>

            <div className="flex justify-center">
                <Button variant="outline" className="cursor-pointer" {...buttonProps}>
                    Сохранить
                </Button>
            </div>
        </div>
    );
}

export function WorkflowParticipantsFormSkeleton() {
    return (
        <div className="h-full flex flex-col justify-between">
            <div className="space-y-4">
                <ApproversFormSkeleton />

                <div>
                    <h3 className="mb-2">Участники:</h3>

                    <ApproversListSkeleton />
                </div>
            </div>

            <div className="flex justify-center">
                <Button variant="outline" className="cursor-pointer" disabled>
                    Сохранить
                </Button>
            </div>
        </div>
    );
}
