export class ApprovalUpsertedEvent {
    public static pattern = "approval.upserted";

    public constructor(
        public workflowDocumentTitle: string,

        public participantId: string
    ) {}
}
