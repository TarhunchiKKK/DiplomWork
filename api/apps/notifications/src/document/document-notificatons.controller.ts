import { Controller } from "@nestjs/common";
import { DocumentNotificationsService } from "./document-notifications.service";
import { EventPattern } from "@nestjs/microservices";
import {
    DocumentCommentCreatedRmqEvent,
    DocumentCommentDeletedRmqEvent,
    DocumentCommentUpdatedRmqEvent
} from "common/rabbitmq";

@Controller()
export class DocumentNotificationsController {
    public constructor(private readonly notificationsService: DocumentNotificationsService) {}

    @EventPattern(DocumentCommentCreatedRmqEvent.PATTERN)
    public async handleCommentCreated(event: DocumentCommentCreatedRmqEvent) {
        await this.notificationsService.handleCommentCreated(event.payload);
    }

    @EventPattern(DocumentCommentUpdatedRmqEvent.PATTERN)
    public async handleCommentUpdated(event: DocumentCommentUpdatedRmqEvent) {
        await this.notificationsService.handleCommentUpdated(event.payload);
    }

    @EventPattern(DocumentCommentDeletedRmqEvent.PATTERN)
    public async handleCommentDeleted(event: DocumentCommentDeletedRmqEvent) {
        await this.notificationsService.handleCommentDeleted(event.payload);
    }
}
