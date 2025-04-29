import { IReceiverData, IRmqEvent } from "../interfaces";

export class ParticipantAddedRmqEvent implements IRmqEvent {
    public static PATTERN = "participant.added";

    public pattern = ParticipantAddedRmqEvent.PATTERN;

    public constructor(
        public documentTitle: string,

        public participant: IReceiverData
    ) {}
}

export class ParticipantDeletedRmqEvent implements IRmqEvent {
    public static PATTERN = "participant.deleted";

    public pattern = ParticipantDeletedRmqEvent.PATTERN;

    public constructor(
        public documentTitle: string,

        public participant: IReceiverData
    ) {}
}
