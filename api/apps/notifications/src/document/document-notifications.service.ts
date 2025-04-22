import { Injectable } from "@nestjs/common";
import { MailsService } from "common/modules";
import { NotificationsService } from "../notifications/notifications.service";
import {
    DocumentCommentCreatedRmqEvent,
    DocumentCommentDeletedRmqEvent,
    DocumentCommentUpdatedRmqEvent
} from "common/rabbitmq";
import { NotificationSubject } from "../notifications/enums/notification-subjects.enum";
import { render } from "@react-email/components";
import { CommentCreatedTemplate } from "./templates/comment-created.template";
import { CommentUpdatedTemplate } from "./templates/comment-updated.template";
import { CommentDeletedTemplate } from "./templates/comment-deleted.template";

@Injectable()
export class DocumentNotificationsService {
    public constructor(
        private readonly mailsService: MailsService,

        private readonly notificationsservice: NotificationsService
    ) {}

    public async handleCommentCreated(dto: DocumentCommentCreatedRmqEvent["payload"]) {
        const [, html] = await Promise.all([
            this.notificationsservice.create({
                receiverId: dto.documentOwnerid,
                subject: NotificationSubject.COMMENT_CREATED
            }),
            render(
                CommentCreatedTemplate({
                    creatorUsername: dto.creatorUsername,
                    documentTitle: dto.documentTitle
                })
            )
        ]);

        this.mailsService.sendMail({
            to: dto.documentOwnerEmail,
            subject: NotificationSubject.COMMENT_CREATED,
            html: html
        });
    }

    public async handleCommentUpdated(dto: DocumentCommentUpdatedRmqEvent["payload"]) {
        const [, html] = await Promise.all([
            this.notificationsservice.create({
                receiverId: dto.documentOwnerid,
                subject: NotificationSubject.COMMENT_UPDATED
            }),
            render(
                CommentUpdatedTemplate({
                    creatorUsername: dto.creatorUsername,
                    documentTitle: dto.documentTitle
                })
            )
        ]);

        this.mailsService.sendMail({
            to: dto.documentOwnerEmail,
            subject: NotificationSubject.COMMENT_UPDATED,
            html: html
        });
    }

    public async handleCommentDeleted(dto: DocumentCommentDeletedRmqEvent["payload"]) {
        const [, html] = await Promise.all([
            this.notificationsservice.create({
                receiverId: dto.documentOwnerid,
                subject: NotificationSubject.COMMENT_DELETED
            }),
            render(
                CommentDeletedTemplate({
                    creatorUsername: dto.creatorUsername,
                    documentTitle: dto.documentTitle
                })
            )
        ]);

        this.mailsService.sendMail({
            to: dto.documentOwnerEmail,
            subject: NotificationSubject.COMMENT_DELETED,
            html: html
        });
    }
}
