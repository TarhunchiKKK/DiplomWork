import { Injectable } from "@nestjs/common";
import { render } from "@react-email/components";
import { MailsService } from "common/modules";
import {
    DocumentCommentCreatedRmqEvent,
    DocumentCommentUpdatedRmqEvent,
    DocumentCommentDeletedRmqEvent
} from "common/rabbitmq";
import { NotificationSubject } from "../../../../../common/enums/notifications/notification-subjects.enum";
import { NotificationsService } from "../../notifications/notifications.service";
import { CommentCreatedTemplate } from "./templates/comment-created.template";
import { CommentDeletedTemplate } from "./templates/comment-deleted.template";
import { CommentUpdatedTemplate } from "./templates/comment-updated.template";

@Injectable()
export class DocumentCommentsNotificationsService {
    public constructor(
        private readonly mailsService: MailsService,

        private readonly notificationsservice: NotificationsService
    ) {}

    public async handleCommentCreated(event: DocumentCommentCreatedRmqEvent) {
        const [, html] = await Promise.all([
            this.notificationsservice.create({
                receiverId: event.documentOwner.id,
                subject: NotificationSubject.COMMENT_CREATED,
                message: `Пользователь ${event.creatorUsername} создал комментарий к вашему документу "${event.documentTitle}"`
            }),
            render(
                CommentCreatedTemplate({
                    creatorUsername: event.creatorUsername,
                    documentTitle: event.documentTitle
                })
            )
        ]);

        this.mailsService.sendMail({
            to: event.documentOwner.email,
            subject: NotificationSubject.COMMENT_CREATED,
            html: html
        });
    }

    public async handleCommentUpdated(event: DocumentCommentUpdatedRmqEvent) {
        const [, html] = await Promise.all([
            this.notificationsservice.create({
                receiverId: event.documentOwner.id,
                subject: NotificationSubject.COMMENT_UPDATED,
                message: `Пользователь ${event.creatorUsername} обноил комментарий к вашему документу "${event.documentTitle}"`

            }),
            render(
                CommentUpdatedTemplate({
                    creatorUsername: event.creatorUsername,
                    documentTitle: event.documentTitle
                })
            )
        ]);

        this.mailsService.sendMail({
            to: event.documentOwner.email,
            subject: NotificationSubject.COMMENT_UPDATED,
            html: html
        });
    }

    public async handleCommentDeleted(event: DocumentCommentDeletedRmqEvent) {
        const [, html] = await Promise.all([
            this.notificationsservice.create({
                receiverId: event.documentOwner.id,
                subject: NotificationSubject.COMMENT_DELETED, 
                message: `Пользователь ${event.creatorUsername} удалил комментарий к вашему документу "${event.documentTitle}"`

            }),
            render(
                CommentDeletedTemplate({
                    creatorUsername: event.creatorUsername,
                    documentTitle: event.documentTitle
                })
            )
        ]);

        this.mailsService.sendMail({
            to: event.documentOwner.email,
            subject: NotificationSubject.COMMENT_DELETED,
            html: html
        });
    }
}
