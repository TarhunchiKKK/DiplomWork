import { Injectable } from "@nestjs/common";
import { MailNotificationsService } from "./mail-notifications/mail.notifications.service";
import { UserInvitationEvent } from "common/rabbitmq";

@Injectable()
export class NotificationsService {
    public constructor(private readonly mailNotificationsService: MailNotificationsService) {}

    public userInvitation(dto: UserInvitationEvent) {
        return this.mailNotificationsService.sendUserInvitation(dto);
    }
}
