import { TFullWorkflow, WorkflowStatus } from "@/entities/workflows";
import { CreateWorkflowButton } from "../create-workflow-button";
import { StartWorkflowButton } from "../start-workflow-button";
import { WorkflowProgress } from "../workflow-progress";
import { WorkflowParticipantsForm } from "@/widgets/workflows/workflow-participants-form";

export function CreatorPanel({ workflow, documentId }: { workflow?: TFullWorkflow; documentId: string }) {
    if (!workflow) {
        return (
            <div className="flex flex-col justify-center items-center space-y-4">
                <p className="text-center">Маршрут для данного документа не создан.</p>

                <CreateWorkflowButton documentId={documentId} />
            </div>
        );
    }

    switch (workflow.status) {
        case WorkflowStatus.DEFAULT:
            // return (
            //     <div className="flex flex-col justify-center items-center space-y-4">
            //         <p className="text-center">Маршрут создан. Вы можете его начать.</p>

            //         <StartWorkflowButton workflowId={workflow.id} />
            //     </div>
            // );

            return <WorkflowParticipantsForm documentId={documentId} />;

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
