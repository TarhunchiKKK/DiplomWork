export class WorkflowDeletedEvent {
    public static pattern = "workflow.deleted";

    public constructor(
        public documentId: string,

        public participantsIds: string[]
    ) {}
}
