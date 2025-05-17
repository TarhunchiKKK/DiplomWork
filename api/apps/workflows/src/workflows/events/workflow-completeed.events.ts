export class WorkflowCompletedEvent {
    public static pattern = "workflow.completed";

    public constructor(public workflowId: string) {}
}
