import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { render } from "@react-email/components";
import { MailsService } from "common/modules";
import { NotificationSubject } from "../notifications/enums/notification-subjects.enum";
import {
    AccountActivatedRmqEvent,
    AccountDeactivatedRmqEvent,
    PasswordResetedRmqEvent,
    UserInvitedRqmEvent
} from "common/rabbitmq";
import { UserInvitatedTemplate } from "./templates/user-invitated.template";
import { PasswordResetedTemplate } from "./templates/password-reseted.template";
import { AccountActivatedTemplate } from "./templates/account-activated.template";
import { AccountDeactivatedTemplate } from "./templates/account-deactivated.template";

@Injectable()
export class UserNotificationsService {
    public constructor(
        private readonly mailsService: MailsService,

        private readonly configService: ConfigService
    ) {}

    private getDomain() {
        return this.configService.getOrThrow<string>("APP_DOMAIN");
    }

    public async handleUserInvited(dto: UserInvitedRqmEvent["payload"]) {
        const domain = this.getDomain();

        const html = await render(
            UserInvitatedTemplate({
                adminEmail: dto.from,
                domain: domain,
                token: dto.token
            })
        );

        this.mailsService.sendMail({
            to: dto.to,
            subject: NotificationSubject.USER_INVITATION,
            html: html
        });
    }

    public async handlePasswordReseted(dto: PasswordResetedRmqEvent["payload"]) {
        const domain = this.getDomain();

        const html = await render(
            PasswordResetedTemplate({
                domain: domain,
                token: dto.token
            })
        );

        this.mailsService.sendMail({
            to: dto.email,
            subject: NotificationSubject.PASSWORD_RECOVERY,
            html: html
        });
    }

    public async handleAccountActivated(dto: AccountActivatedRmqEvent["payload"]) {
        const html = await render(AccountActivatedTemplate());

        this.mailsService.sendMail({
            to: dto.email,
            subject: NotificationSubject.ACCOUNT_ACTIVATION,
            html: html
        });
    }

    public async handleAccountDeactivated(dto: AccountDeactivatedRmqEvent["payload"]) {
        const html = await render(AccountDeactivatedTemplate());

        this.mailsService.sendMail({
            to: dto.email,
            subject: NotificationSubject.ACCOUNT_DEACTIVATION,
            html: html
        });
    }
}
