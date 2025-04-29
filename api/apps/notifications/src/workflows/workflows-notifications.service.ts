import { Injectable } from "@nestjs/common";
import { NotificationsService } from "../notifications/notifications.service";
import { MailsService } from "common/modules";
import { WorkflowCompletedRmqEvent, WorkflowDeletedRmqEvent } from "common/rabbitmq";
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

    public async handleWorkflowDeleted(event: WorkflowDeletedRmqEvent) {
        const [, html] = await Promise.all([
            this.notificationsService.create({
                receiverId: event.participant.id,
                subject: NotificationSubject.WORKFLOW_DELETED
            }),
            render(
                WorkflowDeletedTemplate({
                    documentTitle: event.workflowTitle
                })
            )
        ]);

        this.mailsService.sendMail({
            to: event.participant.email,
            subject: NotificationSubject.WORKFLOW_DELETED,
            html: html
        });
    }

    public async handleWorkflowCompleted(event: WorkflowCompletedRmqEvent) {
        const [, html] = await Promise.all([
            this.notificationsService.create({
                receiverId: event.creator.id,
                subject: NotificationSubject.WORKFLOW_COMPLETED
            }),
            render(
                WorkflowCompletedTemplate({
                    workflowTitle: event.workflowTitle
                })
            )
        ]);

        this.mailsService.sendMail({
            to: event.creator.email,
            subject: NotificationSubject.WORKFLOW_COMPLETED,
            html: html
        });
    }
}
