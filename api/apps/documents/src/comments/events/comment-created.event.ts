export class CommentCreatedEvent {
    public static PATTERN = "comment.created";

    public constructor(public commentId: string) {}
}
