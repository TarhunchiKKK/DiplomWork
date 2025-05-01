export class VersionCreatedEvent {
    public static pattern = "versions.created";

    public constructor(public documentId: string) {}
}
