import { Module } from "@nestjs/common";
import { MailsModule } from "common/modules";
import { AccountDeactivationNotificationsController } from "./account-deactivation-notifications.controller";
import { AccountDeactivationNotificationsService } from "./account-deactivation-notifications.service";

@Module({
    imports: [MailsModule],
    controllers: [AccountDeactivationNotificationsController],
    providers: [AccountDeactivationNotificationsService]
})
export class AccountDeactivationNotificationsModule {}
