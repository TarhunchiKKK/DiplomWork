import { BaseRmqEvent } from "../base-rmq-event";

export class DocumentApprovedRmqEvent extends BaseRmqEvent {
    public static PATTERN = "document.approved";

    public constructor(
        public documentTitle: string,
        public workflowOwnerEmail: string,
        public participantUsername: string
    ) {
        super(DocumentApprovedRmqEvent.PATTERN, { documentTitle, workflowOwnerEmail, participantUsername });
    }
}

export class DocumentSignedRmqEvent extends BaseRmqEvent {
    public static PATTERN = "document.signed";

    public constructor(
        public documentTitle: string,
        public workflowOwnerEmail: string,
        public participantUsername: string
    ) {
        super(DocumentSignedRmqEvent.PATTERN, { documentTitle, workflowOwnerEmail, participantUsername });
    }
}

export class DocumentRejectedRmqEvent extends BaseRmqEvent {
    public static PATTERN = "document.rejected";

    public constructor(
        public documentTitle: string,
        public workflowOwnerEmail: string,
        public participantUsername: string
    ) {
        super(DocumentRejectedRmqEvent.PATTERN, { documentTitle, workflowOwnerEmail, participantUsername });
    }
}
