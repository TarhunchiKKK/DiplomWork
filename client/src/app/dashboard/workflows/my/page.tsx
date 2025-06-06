"use client";

import { useMyWorkflows } from "@/entities/workflows";
import { WorkflowsList, WorkflowsListSkeleton } from "@/widgets/workflows";
import { Suspense } from "react";

export default function MyWorkflowsPage() {
    const { data: workflows } = useMyWorkflows();

    return (
        <Suspense fallback={<WorkflowsListSkeleton />}>{workflows && <WorkflowsList workflows={workflows} />}</Suspense>
    );
}
