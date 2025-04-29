import { IReceiverData, IRmqEvent } from "../interfaces";

export class DocumentApprovedRmqEvent implements IRmqEvent {
    public static PATTERN = "document.approved";

    public pattern = DocumentApprovedRmqEvent.PATTERN;

    public constructor(
        public documentTitle: string,

        public workflowOwner: IReceiverData,

        public participantUsername: string
    ) {}
}

export class DocumentSignedRmqEvent implements IRmqEvent {
    public static PATTERN = "document.signed";

    public pattern = DocumentSignedRmqEvent.PATTERN;

    public constructor(
        public documentTitle: string,

        public workflowOwner: IReceiverData,

        public participantUsername: string
    ) {}
}

export class DocumentRejectedRmqEvent implements IRmqEvent {
    public static PATTERN = "document.rejected";

    public pattern = DocumentRejectedRmqEvent.PATTERN;

    public constructor(
        public documentTitle: string,

        public workflowOwner: IReceiverData,

        public participantUsername: string
    ) {}
}
