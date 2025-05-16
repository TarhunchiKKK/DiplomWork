import { Injectable } from "@nestjs/common";
import { MailsService } from "common/modules";
import { NotificationsService } from "../../notifications/notifications.service";
import { ParticipantAddedRmqEvent, ParticipantDeletedRmqEvent } from "common/rabbitmq";
import { NotificationSubject } from "../../../../../common/enums/notifications/notification-subjects.enum";
import { render } from "@react-email/components";
import { ParticipantAddedTemplate } from "./templates/participant-added.template";
import { ParticipantDeletedTemplate } from "./templates/participant-deleted.template";

@Injectable()
export class WorkflowParticipantsNotificationsService {
    public constructor(
        private readonly notificationsService: NotificationsService,

        private readonly mailsService: MailsService
    ) {}

    public async handleParticipantAdded(event: ParticipantAddedRmqEvent) {
        const [, html] = await Promise.all([
            this.notificationsService.create({
                receiverId: event.participant.id,
                subject: NotificationSubject.PARTICIPANT_ADDED,
                message: `Вы добавлены к маршруту согласования документа ${event.documentTitle}`

            }),
            render(
                ParticipantAddedTemplate({
                    documentTitle: event.documentTitle
                })
            )
        ]);

        this.mailsService.sendMail({
            to: event.participant.email,
            subject: NotificationSubject.PARTICIPANT_ADDED,
            html: html
        });
    }

    public async handleParticipantDeleted(event: ParticipantDeletedRmqEvent) {
        const [, html] = await Promise.all([
            this.notificationsService.create({
                receiverId: event.participant.id,
                subject: NotificationSubject.PARTICIPANT_DELETED,
                message: `Вы удалены из маршрута согласования документа ${event.documentTitle}`
            }),
            render(
                ParticipantDeletedTemplate({
                    documentTitle: event.documentTitle
                })
            )
        ]);

        this.mailsService.sendMail({
            to: event.participant.email,
            subject: NotificationSubject.PARTICIPANT_DELETED,
            html: html
        });
    }
}
