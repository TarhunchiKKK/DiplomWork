import { useMyWorkflows } from "@/entities/workflows";
import { WorkflowsList, WorkflowsListSkeleton } from "@/widgets/workflows";
import { Suspense } from "react";
import { Metadata } from "next";
import { EmptyListMessage } from "@/shared/ui";

export const metadata: Metadata = {
    title: "Your Workflows",
    description: "On this page you can see your workflows."
};

export default function MyWorkflowsPage() {
    "use client";

    const { data: workflows } = useMyWorkflows();

    return (
        <Suspense fallback={<WorkflowsListSkeleton />}>
            {workflows && <WorkflowsList workflows={workflows} />}

            <EmptyListMessage items={workflows} message="Вы не создали ни одного маршрута согласования" />
        </Suspense>
    );
}
