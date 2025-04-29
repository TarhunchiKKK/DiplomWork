import { BaseRmqEvent } from "../base-rmq-event";

export class ParticipantAddedRmqEvent extends BaseRmqEvent {
    public static PATTERN = "participant.added";

    public constructor(
        public documentTitle: string,
        public userEmail: string
    ) {
        super(ParticipantAddedRmqEvent.PATTERN, { documentTitle, userEmail });
    }
}

export class ParticipantDeletedRmqEvent extends BaseRmqEvent {
    public static PATTERN = "participant.deleted";

    public constructor(
        public documentTitle: string,
        public userEmail: string
    ) {
        super(ParticipantDeletedRmqEvent.PATTERN, { documentTitle, userEmail });
    }
}
