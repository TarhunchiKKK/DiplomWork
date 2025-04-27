import { BaseRmqEvent } from "../base-rmq-event";

export class ParticipantDeletedRmqEvent extends BaseRmqEvent {
    public static PATTERN = "participant.deleted";

    public constructor(
        public documentTitle: string,
        public userEmail: string
    ) {
        super(ParticipantDeletedRmqEvent.PATTERN, { documentTitle, userEmail });
    }
}
