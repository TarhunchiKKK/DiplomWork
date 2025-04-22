import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { render } from "@react-email/components";
import { MailsService } from "common/modules";
import { NotificationSubject } from "../notifications/enums/notification-subjects.enum";
import { AccountActivationTemplate } from "./templates/account-activation.template";
import { AccountDeactivationTemplate } from "./templates/account-deactivate.template";
import { ResetPasswordTemplate } from "./templates/reset-password.template";
import { UserInvitationTemplate } from "./templates/user-invitation.template";
import {
    AccountActivatedRmqEvent,
    AccountDeactivatedRmqEvent,
    PasswordResetedRmqEvent,
    UserInvitedRqmEvent
} from "common/rabbitmq";

@Injectable()
export class UserNotificationsService {
    public constructor(
        private readonly mailsService: MailsService,

        private readonly configService: ConfigService
    ) {}

    private getDomain() {
        return this.configService.getOrThrow<string>("APP_DOMAIN");
    }

    public async handleUserInvitation(dto: UserInvitedRqmEvent["payload"]) {
        const domain = this.getDomain();

        const html = await render(
            UserInvitationTemplate({
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

    public async handleResetPassword(dto: PasswordResetedRmqEvent["payload"]) {
        const domain = this.getDomain();

        const html = await render(
            ResetPasswordTemplate({
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

    public async handleActivateAccount(dto: AccountActivatedRmqEvent["payload"]) {
        const html = await render(AccountActivationTemplate());

        this.mailsService.sendMail({
            to: dto.email,
            subject: NotificationSubject.ACCOUNT_ACTIVATION,
            html: html
        });
    }

    public async handleDeactivateAccount(dto: AccountDeactivatedRmqEvent["payload"]) {
        const html = await render(AccountDeactivationTemplate());

        this.mailsService.sendMail({
            to: dto.email,
            subject: NotificationSubject.ACCOUNT_DEACTIVATION,
            html: html
        });
    }
}
