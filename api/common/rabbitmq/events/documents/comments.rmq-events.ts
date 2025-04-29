import { BaseRmqEvent } from "../base-rmq-event";

export class DocumentCommentCreatedRmqEvent extends BaseRmqEvent {
    public static PATTERN = "document.comment.created";

    public constructor(
        documentOwnerId: string,
        documentOwnerEmail: string,
        creatorUsername: string,
        documentTitle: string
    ) {
        super(DocumentCommentCreatedRmqEvent.PATTERN, {
            documentOwnerId,
            documentOwnerEmail,
            creatorUsername,
            documentTitle
        });
    }
}

export class DocumentCommentUpdatedRmqEvent extends BaseRmqEvent {
    public static PATTERN = "document.comment.created";

    public constructor(
        documentOwnerId: string,
        documentOwnerEmail: string,
        creatorUsername: string,
        documentTitle: string
    ) {
        super(DocumentCommentUpdatedRmqEvent.PATTERN, {
            documentOwnerId,
            documentOwnerEmail,
            creatorUsername,
            documentTitle
        });
    }
}

export class DocumentCommentDeletedRmqEvent extends BaseRmqEvent {
    public static PATTERN = "document.comment.deleted";

    public constructor(
        documentOwnerId: string,
        documentOwnerEmail: string,
        creatorUsername: string,
        documentTitle: string
    ) {
        super(DocumentCommentDeletedRmqEvent.PATTERN, {
            documentOwnerId,
            documentOwnerEmail,
            creatorUsername,
            documentTitle
        });
    }
}
