import { Injectable } from "@nestjs/common";
import { NotificationsService } from "../notifications/notifications.service";
import { MailsService } from "common/modules";
import { WorkflowCompletedRmqEvent, WorkflowDeletedRmqEvent } from "common/rabbitmq";
import { NotificationSubject } from "../../../../common/enums/notifications/notification-subjects.enum";
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
                subject: NotificationSubject.WORKFLOW_DELETED,
                message: `Маршрут согласования документа ${event.documentTitle} удален`
            }),
            render(
                WorkflowDeletedTemplate({
                    documentTitle: event.documentTitle
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
                subject: NotificationSubject.WORKFLOW_COMPLETED,
                message: `Маршрут согласования документа ${event.documentTitle} завершен`
            }),
            render(
                WorkflowCompletedTemplate({
                    documentTitle: event.documentTitle
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
