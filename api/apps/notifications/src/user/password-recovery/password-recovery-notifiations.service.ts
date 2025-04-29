import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { render } from "@react-email/components";
import { MailsService } from "common/modules";
import { PasswordResetedRmqEvent } from "common/rabbitmq";
import { NotificationSubject } from "../../../../../common/enums/notifications/notification-subjects.enum";
import { PasswordResetedTemplate } from "./templates/password-reseted.template";

@Injectable()
export class PasswordRecoveryNotificationsService {
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
}
