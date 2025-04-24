export class ParticipantsCreatedEvent {
    public static PATTERN = "participants.created";

    public constructor(
        public usersIds: string[],

        public documentId: string
    ) {}
}
