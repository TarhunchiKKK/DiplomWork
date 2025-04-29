import { Controller } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import {
    DocumentCommentCreatedRmqEvent,
    DocumentCommentUpdatedRmqEvent,
    DocumentCommentDeletedRmqEvent
} from "common/rabbitmq";
import { DocumentCommentsNotificationsService } from "./document-comments-notifications.service";

@Controller()
export class DocumentCommentsNotificationsController {
    public constructor(private readonly notificationsService: DocumentCommentsNotificationsService) {}

    @EventPattern(DocumentCommentCreatedRmqEvent.PATTERN)
    public async handleCommentCreated(event: DocumentCommentCreatedRmqEvent) {
        await this.notificationsService.handleCommentCreated(event);
    }

    @EventPattern(DocumentCommentUpdatedRmqEvent.PATTERN)
    public async handleCommentUpdated(event: DocumentCommentUpdatedRmqEvent) {
        await this.notificationsService.handleCommentUpdated(event);
    }

    @EventPattern(DocumentCommentDeletedRmqEvent.PATTERN)
    public async handleCommentDeleted(event: DocumentCommentDeletedRmqEvent) {
        await this.notificationsService.handleCommentDeleted(event);
    }
}
