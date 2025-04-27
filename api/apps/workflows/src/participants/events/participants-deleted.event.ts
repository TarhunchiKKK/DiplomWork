export class ParticipantsDeletedEvent {
    public static PATTERN = "participants.deleted";

    public constructor(
        public participantsIds: string[],

        public documentId: string
    ) {}
}
