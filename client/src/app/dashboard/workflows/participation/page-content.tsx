"use client";

import { Suspense } from "react";
import { useWorkflowsByParticipation } from "@/entities/workflows";
import { WorkflowsList, WorkflowsListSkeleton } from "@/widgets/workflows";
import { EmptyListMessage } from "@/shared/ui";

export default function ParticipationWorkflowsPageContent() {
    const { data: workflows } = useWorkflowsByParticipation();

    return (
        <Suspense fallback={<WorkflowsListSkeleton />}>
            {workflows && <WorkflowsList workflows={workflows} />}

            <EmptyListMessage items={workflows} message="Вас ещё не добавили к маршрутам согласования" />
        </Suspense>
    );
}
