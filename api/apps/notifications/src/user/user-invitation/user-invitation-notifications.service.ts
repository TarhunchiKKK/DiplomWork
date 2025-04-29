import { Injectable } from "@nestjs/common";
import { UserInvitedRqmEvent } from "common/rabbitmq";
import { ConfigService } from "@nestjs/config";
import { render } from "@react-email/components";
import { MailsService } from "common/modules";
import { NotificationSubject } from "../../notifications/enums/notification-subjects.enum";
import { UserInvitatedTemplate } from "./templates/user-invitated.template";

@Injectable()
export class UserInvitationNotificationsService {
    public constructor(
        private readonly mailsService: MailsService,

        private readonly configService: ConfigService
    ) {}

    private getDomain() {
        return this.configService.getOrThrow<string>("APP_DOMAIN");
    }

    public async handleUserInvited(event: UserInvitedRqmEvent) {
        const domain = this.getDomain();

        const html = await render(
            UserInvitatedTemplate({
                adminEmail: event.from,
                domain: domain,
                token: event.token
            })
        );

        this.mailsService.sendMail({
            to: event.to,
            subject: NotificationSubject.USER_INVITATION,
            html: html
        });
    }
}
