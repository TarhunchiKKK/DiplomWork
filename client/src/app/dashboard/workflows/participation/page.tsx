"use client";

import { Suspense } from "react";
import { useWorkflowsByParticipation } from "@/entities/workflows";
import { WorkflowsList, WorkflowsListSkeleton } from "@/widgets/workflows";

export default function ParticipationWorkflowsPage() {
    const { data: workflows } = useWorkflowsByParticipation();

    return (
        <Suspense fallback={<WorkflowsListSkeleton />}>{workflows && <WorkflowsList workflows={workflows} />}</Suspense>
    );
}
