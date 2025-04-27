import { Injectable } from "@nestjs/common";
import { MailsService } from "common/modules";
import { NotificationsService } from "../../notifications/notifications.service";
import { ParticipantAddedRmqEvent, ParticipantDeletedRmqEvent } from "common/rabbitmq";
import { NotificationSubject } from "../../notifications/enums/notification-subjects.enum";
import { render } from "@react-email/components";
import { ParticipantAddedTemplate } from "./templates/participant-added.template";
import { ParticipantDeletedTemplate } from "./templates/participant-deleted.template";

@Injectable()
export class WorkflowParticipantsNotificationsService {
    public constructor(
        private readonly notificationsService: NotificationsService,

        private readonly mailsService: MailsService
    ) {}

    public async handleParticipantAdded(dto: ParticipantAddedRmqEvent["payload"]) {
        const [, html] = await Promise.all([
            this.notificationsService.create({
                receiverId: dto.userEmail,
                subject: NotificationSubject.PARTICIPANT_ADDED
            }),
            render(
                ParticipantAddedTemplate({
                    documentTitle: dto.documentTitle
                })
            )
        ]);

        this.mailsService.sendMail({
            to: dto.userEmail,
            subject: NotificationSubject.PARTICIPANT_ADDED,
            html: html
        });
    }

    public async handleParticipantDeleted(dto: ParticipantDeletedRmqEvent["payload"]) {
        const [, html] = await Promise.all([
            this.notificationsService.create({
                receiverId: dto.userEmail,
                subject: NotificationSubject.PARTICIPANT_DELETED
            }),
            render(
                ParticipantDeletedTemplate({
                    documentTitle: dto.documentTitle
                })
            )
        ]);

        this.mailsService.sendMail({
            to: dto.userEmail,
            subject: NotificationSubject.PARTICIPANT_DELETED,
            html: html
        });
    }
}
