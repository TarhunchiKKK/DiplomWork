import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { render } from "@react-email/components";
import { MailsService } from "common/modules";
import { PasswordResetedRmqEvent, AccountActivatedRmqEvent, AccountDeactivatedRmqEvent } from "common/rabbitmq";
import { NotificationSubject } from "../../notifications/enums/notification-subjects.enum";
import { PasswordResetedTemplate } from "../password-recovery/templates/password-reseted.template";
import { AccountActivatedTemplate } from "./templates/account-activated.template";
import { AccountDeactivatedTemplate } from "./templates/account-deactivated.template";

@Injectable()
export class AccountDeactivationNotificationsService {
    public constructor(
        private readonly mailsService: MailsService,

        private readonly configService: ConfigService
    ) {}

    private getDomain() {
        return this.configService.getOrThrow<string>("APP_DOMAIN");
    }

    public async handlePasswordReseted(event: PasswordResetedRmqEvent) {
        const domain = this.getDomain();

        const html = await render(
            PasswordResetedTemplate({
                domain: domain,
                token: event.token
            })
        );

        this.mailsService.sendMail({
            to: event.email,
            subject: NotificationSubject.PASSWORD_RECOVERY,
            html: html
        });
    }

    public async handleAccountActivated(event: AccountActivatedRmqEvent) {
        const html = await render(AccountActivatedTemplate());

        this.mailsService.sendMail({
            to: event.email,
            subject: NotificationSubject.ACCOUNT_ACTIVATION,
            html: html
        });
    }

    public async handleAccountDeactivated(event: AccountDeactivatedRmqEvent) {
        const html = await render(AccountDeactivatedTemplate());

        this.mailsService.sendMail({
            to: event.email,
            subject: NotificationSubject.ACCOUNT_DEACTIVATION,
            html: html
        });
    }
}
