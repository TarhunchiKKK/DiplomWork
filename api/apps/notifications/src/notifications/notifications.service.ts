import { Injectable } from "@nestjs/common";
import { MailNotificationsService } from "./mail-notifications/mail.notifications.service";
import { ResetPasswordEvent, UserInvitationEvent } from "common/rabbitmq";

@Injectable()
export class NotificationsService {
    public constructor(private readonly mailNotificationsService: MailNotificationsService) {}

    public userInvitation(dto: UserInvitationEvent) {
        return this.mailNotificationsService.sendUserInvitationMail(dto);
    }

    public resetPassword(dto: ResetPasswordEvent) {
        return this.mailNotificationsService.sendResetPasswordMail(dto);
    }
}
