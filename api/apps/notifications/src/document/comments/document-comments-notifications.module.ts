import { Module } from "@nestjs/common";
import { MailsModule } from "common/modules";
import { NotificationsModule } from "../../notifications/notifications.module";
import { DocumentCommentsNotificationsController } from "./document-comments-notifications.controller";
import { DocumentCommentsNotificationsService } from "./document-comments-notifications.service";

@Module({
    imports: [MailsModule, NotificationsModule],
    controllers: [DocumentCommentsNotificationsController],
    providers: [DocumentCommentsNotificationsService]
})
export class DocumentCommentsNotificationsModule {}
