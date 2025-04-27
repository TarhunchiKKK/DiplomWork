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
