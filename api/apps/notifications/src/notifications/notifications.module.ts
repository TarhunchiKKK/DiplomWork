import { Module } from "@nestjs/common";
import { MailNotificationsModule } from "./mail-notifications/mail-notifications.module";
import { NotificationsController } from "./notifications.controller";
import { NotificationsService } from "./notifications.service";

@Module({
    imports: [MailNotificationsModule],
    controllers: [NotificationsController],
    providers: [NotificationsService]
})
export class NotificationsModule {}
