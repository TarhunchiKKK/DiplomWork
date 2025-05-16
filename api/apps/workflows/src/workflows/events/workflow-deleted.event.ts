export class WorkflowDeletedEvent {
    public static pattern = "workflow.deleted";

    public constructor(
        public documentTitle: string,

        public participantsIds: string[]
    ) {}
}
