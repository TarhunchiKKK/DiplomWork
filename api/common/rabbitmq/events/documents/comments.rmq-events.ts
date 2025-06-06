import { IReceiverData, IRmqEvent } from "../interfaces";

export class DocumentCommentCreatedRmqEvent implements IRmqEvent {
    public static PATTERN = "document.comment.created";

    public constructor(
        public documentOwner: IReceiverData,

        public creatorUsername: string,

        public documentTitle: string
    ) {}
}

export class DocumentCommentUpdatedRmqEvent implements IRmqEvent {
    public static PATTERN = "document.comment.created";

    public constructor(
        public documentOwner: IReceiverData,

        public creatorUsername: string,

        public documentTitle: string
    ) {}
}

export class DocumentCommentDeletedRmqEvent implements IRmqEvent {
    public static PATTERN = "document.comment.deleted";

    public constructor(
        public documentOwner: IReceiverData,

        public creatorUsername: string,

        public documentTitle: string
    ) {}
}
