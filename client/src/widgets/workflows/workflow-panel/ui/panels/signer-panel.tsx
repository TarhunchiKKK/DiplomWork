import { TFullWorkflow, WorkflowStatus } from "@/entities/workflows";
import { SignWorkflowButton } from "../sign-workfolow-button";
import { WorkflowProgress } from "../workflow-progress";

export function SignerPanel({ workflow }: { workflow?: TFullWorkflow }) {
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

                    <p>Вы сможете подписать документ, когда он будет полностью утвержден</p>
                </div>
            );
        case WorkflowStatus.REJECTED:
            return (
                <div className="space-y-4">
                    <WorkflowProgress participants={workflow.participants} />

                    <span>Документ был отклонен</span>
                </div>
            );
        case WorkflowStatus.FULLY_APPROVED:
            return (
                <div className="space-y-4">
                    <p>Документ утвержден. Вы можете подписать его</p>

                    <SignWorkflowButton workflowId={workflow.id} />
                </div>
            );
        case WorkflowStatus.COMPLETED:
            return <span>Маршрут завершен</span>;
    }
}
