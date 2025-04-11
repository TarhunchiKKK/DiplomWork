import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { SendMailDto } from "./dto/send-mail.dot";
import { ConfigService } from "@nestjs/config";
import { render } from "@react-email/components";
import { UserInvitationTemplate } from "./templates/user-invitation.template";
import { NotificationSubject } from "../enums/notification-subjects.enum";
import { ResetPasswordEvent, UserInvitationEvent } from "common/rabbitmq";
import { ResetPasswordTemplate } from "./templates/reset-password.template";

@Injectable()
export class MailNotificationsService {
    public constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService
    ) {}

    private sendMail(dto: SendMailDto) {
        try {
            return this.mailerService.sendMail({
                to: dto.to,
                subject: dto.subject,
                html: dto.html
            });
        } catch (error: unknown) {
            console.log("SMTP error:");
            console.error(error);
        }
    }

    private getDomain() {
        return this.configService.getOrThrow<string>("APP_DOMAIN");
    }

    public async sendUserInvitationMail(dto: UserInvitationEvent["payload"]) {
        const domain = this.getDomain();

        const html = await render(
            UserInvitationTemplate({
                adminEmail: dto.from,
                domain: domain,
                token: dto.token
            })
        );

        this.sendMail({
            to: dto.to,
            subject: NotificationSubject.USER_INVITATION,
            html: html
        });
    }

    public async sendResetPasswordMail(dto: ResetPasswordEvent["payload"]) {
        const domain = this.getDomain();

        const html = await render(
            ResetPasswordTemplate({
                domain: domain,
                token: dto.token
            })
        );

        this.sendMail({
            to: dto.email,
            subject: NotificationSubject.PASSWORD_RECOVERY,
            html: html
        });
    }
}
