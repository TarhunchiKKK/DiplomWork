import { TFullWorkflow, WorkflowStatus } from "@/entities/workflows";
import { ApproverButtons } from "../approver-buttons/approver-buttons";
import { WorkflowProgress } from "../workflow-progress";

export function ApproverPanel({ workflow, documentId }: { workflow?: TFullWorkflow; documentId: string }) {
    if (!workflow) {
        return <span>Маршрут еще не создан</span>;
    }

    switch (workflow.status) {
        case WorkflowStatus.DEFAULT:
            return <span>Маршрут еще на начат</span>;
        case WorkflowStatus.STARTED:
            return (
                <div className="space-y-4">
                    <WorkflowProgress participants={workflow.participants} />

                    <ApproverButtons documentId={documentId} />
                </div>
            );
        case WorkflowStatus.REJECTED:
            return (
                <div>
                    <WorkflowProgress participants={workflow.participants} />

                    <span>Маршрут отклонен</span>
                </div>
            );
        case WorkflowStatus.FULLY_APPROVED:
            return <span>Документ полностью согласован</span>;
        case WorkflowStatus.COMPLETED:
            return <span>Маршрут завершен</span>;
    }
}
