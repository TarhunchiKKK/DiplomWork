"use client";

import { ApproversForm } from "./approvers-form";
import { useSetup } from "./hooks";

export function WorkflowParticipantsForm() {
    useSetup();

    return <ApproversForm />;
}

export function WorkflowParticipantsFormSkeleton() {
    return <></>;
}
