import { Injectable } from "@nestjs/common";
import { UserInvitationDto } from "./dto/user-invitation.dto";
import { MailNotificationsService } from "./mail-notifications/mail.notifications.service";

@Injectable()
export class NotificationsService {
    public constructor(private readonly mailNotificationsService: MailNotificationsService) {}

    public userInvitation(dto: UserInvitationDto) {
        return this.mailNotificationsService.sendUserInvitation({
            adminEmail: dto.from,
            userEmail: dto.to,
            token: dto.token
        });
    }
}
