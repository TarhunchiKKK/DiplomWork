export class CommentUpdatedEvent {
    public static PATTERN = "comment.updated";

    public constructor(public commentId: string) {}
}
