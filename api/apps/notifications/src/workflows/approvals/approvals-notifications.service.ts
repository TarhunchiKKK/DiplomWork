import { Injectable } from "@nestjs/common";
import { NotificationsService } from "../../notifications/notifications.service";
import { DocumentApprovedRmqEvent, DocumentRejectedRmqEvent, DocumentSignedRmqEvent } from "common/rabbitmq";
import { NotificationSubject } from "../../notifications/enums/notification-subjects.enum";

@Injectable()
export class ApprovalsnotificationsService {
    public constructor(private readonly notificationsService: NotificationsService) {}

    public async handleDocumentApproved(dto: DocumentApprovedRmqEvent["payload"]) {
        await this.notificationsService.create({
            receiverId: dto.workflowOwnerEmail,
            subject: NotificationSubject.DOCUMENT_APPROVED
        });
    }

    public async handleDocumentSigned(dto: DocumentSignedRmqEvent["payload"]) {
        await this.notificationsService.create({
            receiverId: dto.workflowOwnerEmail,
            subject: NotificationSubject.DOCUMENT_SIGNED
        });
    }

    public async handleDocumentRejected(dto: DocumentRejectedRmqEvent["payload"]) {
        await this.notificationsService.create({
            receiverId: dto.workflowOwnerEmail,
            subject: NotificationSubject.DOCUMENT_REJECTED
        });
    }
}
