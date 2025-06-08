import { TFullWorkflow, WorkflowStatus } from "@/entities/workflows";
import { CreateWorkflowButton } from "../create-workflow-button";
import { StartWorkflowButton } from "../start-workflow-button";
import { WorkflowProgress } from "../workflow-progress";
import { WorkflowParticipantsForm } from "@/widgets/workflows/workflow-participants-form";
import { useState } from "react";

const settingsLabelClassName = "underline text-sm cursor-pointer";

export function CreatorPanel({ workflow, documentId }: { workflow?: TFullWorkflow; documentId: string }) {
    const [isSettingsPanel, setIsSettingsPanel] = useState(false);

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
            return (
                <div className="flex flex-col justify-center items-center space-y-4">
                    {isSettingsPanel && (
                        <>
                            <WorkflowParticipantsForm documentId={documentId} />

                            <p className={settingsLabelClassName} onClick={setIsSettingsPanel.bind(null, false)}>
                                К маршруту
                            </p>
                        </>
                    )}

                    {!isSettingsPanel && (
                        <>
                            <p className="text-center">Маршрут создан. Вы можете его начать.</p>

                            <StartWorkflowButton documentId={documentId} />

                            <p className={settingsLabelClassName} onClick={setIsSettingsPanel.bind(null, true)}>
                                Выбрать участников
                            </p>
                        </>
                    )}
                </div>
            );
        case WorkflowStatus.STARTED:
            return (
                <div className="flex flex-col justify-center items-center space-y-4">
                    {isSettingsPanel && (
                        <>
                            <WorkflowParticipantsForm documentId={documentId} />

                            <p className={settingsLabelClassName} onClick={setIsSettingsPanel.bind(null, false)}>
                                К маршруту
                            </p>
                        </>
                    )}

                    {!isSettingsPanel && (
                        <>
                            <WorkflowProgress participants={workflow.participants} />

                            <p className={settingsLabelClassName} onClick={setIsSettingsPanel.bind(null, true)}>
                                Выбрать участников
                            </p>
                        </>
                    )}
                </div>
            );
        case WorkflowStatus.REJECTED:
            return (
                <div className="flex flex-col justify-center items-center space-y-4">
                    {isSettingsPanel && (
                        <>
                            <WorkflowParticipantsForm documentId={documentId} />

                            <p className={settingsLabelClassName} onClick={setIsSettingsPanel.bind(null, false)}>
                                К маршруту
                            </p>
                        </>
                    )}

                    {!isSettingsPanel && (
                        <>
                            <WorkflowProgress participants={workflow.participants} />

                            <span className="text-red-400">Маршрут был отклонен</span>

                            <StartWorkflowButton documentId={documentId} />

                            <p className={settingsLabelClassName} onClick={setIsSettingsPanel.bind(null, true)}>
                                Выбрать участников
                            </p>
                        </>
                    )}
                </div>
            );
        case WorkflowStatus.FULLY_APPROVED:
            return (
                <div className="space-y-4">
                    <WorkflowProgress participants={workflow.participants} />

                    <span className="text-green-400">Документ полностью утвержден, но еще не подписан</span>
                </div>
            );
        case WorkflowStatus.COMPLETED:
            return <span className="text-green-400">Документ согласован и подписан</span>;
    }
}
