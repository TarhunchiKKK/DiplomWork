import { Injectable } from "@nestjs/common";
import { NotificationsService } from "../../notifications/notifications.service";
import { DocumentApprovedRmqEvent, DocumentRejectedRmqEvent, DocumentSignedRmqEvent } from "common/rabbitmq";
import { NotificationSubject } from "../../../../../common/enums/notifications/notification-subjects.enum";

@Injectable()
export class ApprovalsnotificationsService {
    public constructor(private readonly notificationsService: NotificationsService) {}

    public async handleDocumentApproved(event: DocumentApprovedRmqEvent) {
        await this.notificationsService.create({
            receiverId: event.workflowOwner.id,
            subject: NotificationSubject.DOCUMENT_APPROVED,
            message: `Пользователь ${event.participantUsername} одобрил ваш документ "${event.documentTitle}"`
        });
    }

    public async handleDocumentSigned(event: DocumentSignedRmqEvent) {
        await this.notificationsService.create({
            receiverId: event.workflowOwner.id,
            subject: NotificationSubject.DOCUMENT_SIGNED,
            message: `Пользователь ${event.participantUsername} подписал ваш документ "${event.documentTitle}"`
        });
    }

    public async handleDocumentRejected(event: DocumentRejectedRmqEvent) {
        await this.notificationsService.create({
            receiverId: event.workflowOwner.id,
            subject: NotificationSubject.DOCUMENT_REJECTED,
            message: `Пользователь ${event.participantUsername} отклонил ваш документ "${event.documentTitle}"`
        });
    }
}
