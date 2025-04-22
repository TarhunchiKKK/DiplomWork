import { Module } from "@nestjs/common";
import { MailsModule } from "common/modules";
import { NotificationsModule } from "../notifications/notifications.module";
import { DocumentNotificationsService } from "./document-notifications.service";

@Module({
    imports: [MailsModule, NotificationsModule],
    controllers: [DocumentNotificationsModule],
    providers: [DocumentNotificationsService]
})
export class DocumentNotificationsModule {}
