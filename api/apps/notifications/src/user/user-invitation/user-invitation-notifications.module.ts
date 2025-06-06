import { Module } from "@nestjs/common";
import { MailsModule } from "common/modules";
import { UserInvitationNotificationsController } from "./user-invitation-notifications.controller";
import { UserInvitationNotificationsService } from "./user-invitation-notifications.service";
import { RmqModule } from "common/rabbitmq";

@Module({
    imports: [MailsModule, RmqModule],
    controllers: [UserInvitationNotificationsController],
    providers: [UserInvitationNotificationsService]
})
export class UserInvitationNotificationsModule {}
