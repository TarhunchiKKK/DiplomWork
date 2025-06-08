import { TFullWorkflow, WorkflowStatus } from "@/entities/workflows";
import { ApproverButtons } from "../approver-buttons/approver-buttons";
import { WorkflowProgress } from "../workflow-progress";

export function ApproverPanel({ workflow, documentId }: { workflow?: TFullWorkflow; documentId: string }) {
    if (!workflow) {
        return <p className="text-center">Маршрут еще не создан</p>;
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

                    <p className="text-red-400 text-center">Маршрут был отклонен</p>
                </div>
            );
        case WorkflowStatus.FULLY_APPROVED:
            return <p className="text-green-400 text-center">Документ полностью согласован</p>;
        case WorkflowStatus.COMPLETED:
            return <p className="text-green-400 text-center">Маршрут завершен</p>;
    }
}
