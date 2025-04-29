import { Controller } from "@nestjs/common";
import { ApprovalsnotificationsService } from "./approvals-notifications.service";
import { EventPattern } from "@nestjs/microservices";
import { DocumentApprovedRmqEvent, DocumentRejectedRmqEvent, DocumentSignedRmqEvent } from "common/rabbitmq";

@Controller()
export class ApprovalsNotificationsController {
    public constructor(private readonly notificationsService: ApprovalsnotificationsService) {}

    @EventPattern(DocumentApprovedRmqEvent.PATTERN)
    public async handleDocumentApproved(event: DocumentApprovedRmqEvent) {
        await this.notificationsService.handleDocumentApproved(event);
    }

    @EventPattern(DocumentSignedRmqEvent.PATTERN)
    public async handleDocumentSigned(event: DocumentSignedRmqEvent) {
        await this.notificationsService.handleDocumentSigned(event);
    }

    @EventPattern(DocumentRejectedRmqEvent.PATTERN)
    public async handleDocumentRejected(event: DocumentRejectedRmqEvent) {
        await this.notificationsService.handleDocumentRejected(event);
    }
}
