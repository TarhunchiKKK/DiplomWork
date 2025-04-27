export class ParticipantsCreatedEvent {
    public static PATTERN = "participants.created";

    public constructor(
        public participantsIds: string[],

        public documentId: string
    ) {}
}
