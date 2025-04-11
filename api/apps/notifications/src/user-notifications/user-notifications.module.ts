import { Module } from "@nestjs/common";
import { UserNotificationsController } from "./user-notifications.controller";
import { UserNotificationsService } from "./user-notifications.service";
import { MailsModule } from "common/modules";
import { NotificationsModule } from "../notifications/notifications.module";

@Module({
    imports: [MailsModule, NotificationsModule],
    controllers: [UserNotificationsController],
    providers: [UserNotificationsService]
})
export class UserNotificationsModule {}
