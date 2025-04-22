import { BaseRmqEvent } from "../base-rmq-event";

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
