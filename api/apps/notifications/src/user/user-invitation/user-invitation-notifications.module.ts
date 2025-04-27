import { Module } from "@nestjs/common";
import { MailsModule } from "common/modules";
import { UserInvitationNotificationsController } from "./user-invitation-notifications.controller";
import { UserInvitationNotificationsService } from "./user-invitation-notifications.service";

@Module({
    imports: [MailsModule],
    controllers: [UserInvitationNotificationsController],
    providers: [UserInvitationNotificationsService]
})
export class UserInvitationNotificationsModule {}
