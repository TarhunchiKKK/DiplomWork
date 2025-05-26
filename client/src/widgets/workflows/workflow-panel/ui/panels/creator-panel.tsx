import { TFullWorkflow, WorkflowStatus } from "@/entities/workflows";
import { CreateWorkflowButton } from "../create-workflow-button";
import { StartWorkflowButton } from "../start-workflow-button";
import { WorkflowProgress } from "../workflow-progress";

export function CreatorPanel({ workflow, documentId }: { workflow?: TFullWorkflow; documentId: string }) {
    if (!workflow) {
        return <CreateWorkflowButton documentId={documentId} />;
    }

    switch (workflow.status) {
        case WorkflowStatus.DEFAULT:
            return <StartWorkflowButton workflowId={workflow.id} />;
        case WorkflowStatus.STARTED:
            return <WorkflowProgress participants={workflow.participants} />;
        case WorkflowStatus.REJECTED:
            return <WorkflowProgress participants={workflow.participants} />;
        case WorkflowStatus.FULLY_APPROVED:
            return (
                <div className="space-y-4">
                    <WorkflowProgress participants={workflow.participants} />

                    <span>Документ полностью утвержден, но еще не подписан</span>
                </div>
            );
        case WorkflowStatus.COMPLETED:
            return <span>Документ согласован и подписан</span>;
    }
}
