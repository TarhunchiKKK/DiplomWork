export class RecalculateWorkflowStatusEvent {
    public static pattern = "recalculate.workflow.status";

    public constructor(public workflowId: string) {}
}
