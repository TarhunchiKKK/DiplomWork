export class ParticipantsUpsertedRmqEvent {
    public static PATTERN = "participants.upserted";

    public pattern = ParticipantsUpsertedRmqEvent.PATTERN;

    public constructor(
        public documentId: string,

        public participantsIds: string[]
    ) {}
}

export class SignerUpdatedRmqEvent {
    public static PATTERN = "signer.updated";

    public pattern = SignerUpdatedRmqEvent.PATTERN;

    public constructor(
        public documentId: string,

        public signerId: string
    ) {}
}
