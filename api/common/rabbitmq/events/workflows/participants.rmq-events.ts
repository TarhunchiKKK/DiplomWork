import { IReceiverData, IRmqEvent } from "../interfaces";

export class ParticipantAddedRmqEvent implements IRmqEvent {
    public static PATTERN = "participant.added";

    public constructor(
        public documentTitle: string,

        public participant: IReceiverData
    ) {}
}

export class ParticipantDeletedRmqEvent implements IRmqEvent {
    public static PATTERN = "participant.deleted";

    public constructor(
        public documentTitle: string,

        public participant: IReceiverData
    ) {}
}
