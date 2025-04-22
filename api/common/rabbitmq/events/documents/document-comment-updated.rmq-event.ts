import { BaseRmqEvent } from "../base-rmq-event";

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
