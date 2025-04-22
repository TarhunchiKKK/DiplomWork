import { Injectable } from "@nestjs/common";
import { DocumentsService } from "../documents/documents.service";
import { DocumentVersionsService } from "../versions/document-versions.service";
import { DocumentCommentsService } from "../comments/document-comments.service";
import {
    DocumentCommentCreatedRmqEvent,
    DocumentCommentDeletedRmqEvent,
    DocumentCommentUpdatedRmqEvent,
    NotificationsRmqService
} from "common/rabbitmq";
import { OnEvent } from "@nestjs/event-emitter";
import { CommentCreatedEvent } from "./events/comment-created.event";
import { UsersGrpcService } from "common/grpc";
import { firstValueFrom } from "rxjs";
import { CommentUpdatedEvent } from "./events/comment-updated.event";
import { CommentDeletedEvent } from "./events/comment-deleted.event";

@Injectable()
export class DocumentEventsObserver {
    public constructor(
        private readonly documentsService: DocumentsService,

        private readonly versionsService: DocumentVersionsService,

        private readonly commentsService: DocumentCommentsService,

        private readonly usersGrpcService: UsersGrpcService,

        private readonly notificationsRmqService: NotificationsRmqService
    ) {}

    private async getCommentInfo(commentId: string) {
        const comment = await this.commentsService.findOne(commentId);

        const document = await this.versionsService.findVersionDocument(comment.version.id);

        const [documentAuthor, commentCreator] = await Promise.all([
            firstValueFrom(this.usersGrpcService.call("findOne", { id: document.authorId })),
            firstValueFrom(this.usersGrpcService.call("findOne", { id: comment.creatorId }))
        ]);

        return {
            document,
            comment,
            documentAuthor,
            commentCreator
        };
    }

    @OnEvent(CommentCreatedEvent.PATTERN)
    public async handleCommentCreated(event: CommentCreatedEvent) {
        const { document, documentAuthor, commentCreator } = await this.getCommentInfo(event.commentId);

        this.notificationsRmqService.emit(
            new DocumentCommentCreatedRmqEvent(
                documentAuthor.id,
                documentAuthor.email,
                commentCreator.email,
                document.title
            )
        );
    }

    @OnEvent(CommentUpdatedEvent.PATTERN)
    public async handleCommentUpdated(event: CommentUpdatedEvent) {
        const { document, documentAuthor, commentCreator } = await this.getCommentInfo(event.commentId);

        this.notificationsRmqService.emit(
            new DocumentCommentUpdatedRmqEvent(
                documentAuthor.id,
                documentAuthor.email,
                commentCreator.email,
                document.title
            )
        );
    }

    @OnEvent(CommentDeletedEvent.PATTERN)
    public async handleCommentDeleted(event: CommentDeletedEvent) {
        const { document, documentAuthor, commentCreator } = await this.getCommentInfo(event.commentId);

        this.notificationsRmqService.emit(
            new DocumentCommentDeletedRmqEvent(
                documentAuthor.id,
                documentAuthor.email,
                commentCreator.email,
                document.title
            )
        );
    }
}
