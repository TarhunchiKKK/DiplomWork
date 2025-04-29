export class ApprovalUpsertedEvent {
    public static pattern = "approval.upserted";

    public constructor(public participantId: string) {}
}
