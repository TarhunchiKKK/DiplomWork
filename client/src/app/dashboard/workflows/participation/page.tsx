"use client";

import { Suspense } from "react";
import { useWorkflowsByParticipation } from "@/entities/workflows";
import { WorkflowsList, WorkflowsListSkeleton } from "@/widgets/workflows";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Other Workflows",
    description: "On this page you can see workflows in which you are invited."
};

export default function ParticipationWorkflowsPage() {
    const { data: workflows } = useWorkflowsByParticipation();

    return (
        <Suspense fallback={<WorkflowsListSkeleton />}>{workflows && <WorkflowsList workflows={workflows} />}</Suspense>
    );
}
