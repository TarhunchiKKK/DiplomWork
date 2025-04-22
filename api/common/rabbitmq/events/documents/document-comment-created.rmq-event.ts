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
