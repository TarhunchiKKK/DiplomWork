import { TFullWorkflow, WorkflowStatus } from "@/entities/workflows";
import { SignWorkflowButton } from "../sign-workfolow-button";
import { WorkflowProgress } from "../workflow-progress";

export function SignerPanel({ workflow, documentId }: { workflow?: TFullWorkflow; documentId: string }) {
    if (!workflow) {
        return <span>Маршрут еще не создан</span>;
    }

    switch (workflow.status) {
        case WorkflowStatus.DEFAULT:
            return <span>Маршрут еще на начат</span>;
        case WorkflowStatus.STARTED:
            return (
                <div className="flex flex-col items-center space-y-4">
                    <WorkflowProgress participants={workflow.participants} />

                    <p>Вы сможете подписать документ, когда он будет полностью утвержден</p>
                </div>
            );
        case WorkflowStatus.REJECTED:
            return (
                <div className="flex flex-col items-center space-y-4">
                    <WorkflowProgress participants={workflow.participants} />

                    <span className="text-red-400">Документ был отклонен</span>
                </div>
            );
        case WorkflowStatus.FULLY_APPROVED:
            return (
                <div className="flex flex-col items-center space-y-4">
                    <p className="text-green-400">Документ утвержден. Вы можете подписать его</p>

                    <SignWorkflowButton documentId={documentId} />
                </div>
            );
        case WorkflowStatus.COMPLETED:
            return (
                <div className="flex flex-col items-center space-y-4">
                    <p className="text-green-400">Маршрут завершен</p>
                </div>
            );
    }
}
