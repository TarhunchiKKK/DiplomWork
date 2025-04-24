export class ParticipantsDeletedEvent {
    public static PATTERN = "participants.deleted";

    public constructor(
        public usersIds: string[],

        public documentId: string
    ) {}
}
