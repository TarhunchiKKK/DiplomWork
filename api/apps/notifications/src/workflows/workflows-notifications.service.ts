import { Injectable } from "@nestjs/common";
import { NotificationsService } from "../notifications/notifications.service";
import { MailsService } from "common/modules";
import { WorkflowDeletedRmqEvent } from "common/rabbitmq";
import { NotificationSubject } from "../notifications/enums/notification-subjects.enum";
import { render } from "@react-email/components";
import { WorkflowDeletedTemplate } from "./templates/workflow-deleted.template";
import { WorkflowCompletedTemplate } from "./templates/workflow-completed.template";

@Injectable()
export class WorkflowsNotificationsService {
    public constructor(
        private readonly notificationsService: NotificationsService,

        private readonly mailsService: MailsService
    ) {}

    public async handleWorkflowDeleted(dto: WorkflowDeletedRmqEvent["payload"]) {
        const [, html] = await Promise.all([
            this.notificationsService.create({
                receiverId: dto.userEmail,
                subject: NotificationSubject.WORKFLOW_DELETED
            }),
            render(
                WorkflowDeletedTemplate({
                    documentTitle: dto.documentTitle
                })
            )
        ]);

        this.mailsService.sendMail({
            to: dto.userEmail,
            subject: NotificationSubject.WORKFLOW_DELETED,
            html: html
        });
    }

    public async handleWorkflowCompleted(dto: WorkflowDeletedRmqEvent["payload"]) {
        const [, html] = await Promise.all([
            this.notificationsService.create({
                receiverId: dto.creator.id,
                subject: NotificationSubject.WORKFLOW_COMPLETED
            }),
            render(
                WorkflowCompletedTemplate({
                    workflowTitle: dto.title
                })
            )
        ]);

        this.mailsService.sendMail({
            to: dto.creator.email,
            subject: NotificationSubject.WORKFLOW_COMPLETED,
            html: html
        });
    }
}
