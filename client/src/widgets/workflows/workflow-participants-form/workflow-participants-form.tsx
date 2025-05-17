"use client";

import { ApproversForm } from "./approvers-form";
import { useSetup } from "./hooks";
import { SignerDropdown } from "./signer-dropdown";

export function WorkflowParticipantsForm() {
    useSetup();

    return (
        <div>
            <ApproversForm />

            <SignerDropdown />
        </div>
    );
}

export function WorkflowParticipantsFormSkeleton() {
    return <></>;
}
