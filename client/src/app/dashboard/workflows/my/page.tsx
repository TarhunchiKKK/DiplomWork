"use client";

import { useMyWorkflows } from "@/entities/workflows";
import { WorkflowsList, WorkflowsListSkeleton } from "@/widgets/workflows";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Your Workflows",
    description: "On this page you can see your workflows."
};

export default function MyWorkflowsPage() {
    const { data: workflows } = useMyWorkflows();

    return (
        <Suspense fallback={<WorkflowsListSkeleton />}>{workflows && <WorkflowsList workflows={workflows} />}</Suspense>
    );
}
