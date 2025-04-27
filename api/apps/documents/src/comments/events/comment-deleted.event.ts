export class CommentDeletedEvent {
    public static PATTERN = "comment.deleted";

    public constructor(public commentId: string) {}
}
