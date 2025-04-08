import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { SendMailDto } from "./dto/send-mail.dot";
import { SendUserInvitationDto } from "./dto/send-user-invitation.dto";
import { ConfigService } from "@nestjs/config";
import { render } from "@react-email/components";
import { UserInvitationTemplate } from "./templates/user-invitation.template";
import { NotificationSubject } from "../enums/notification-subjects.enum";

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
            console.error(error);
        }
    }

    private getDomain() {
        return this.configService.getOrThrow<string>("APP_DOMAIN");
    }

    public async sendUserInvitation(dto: SendUserInvitationDto) {
        const domain = this.getDomain();

        const html = await render(
            UserInvitationTemplate({
                adminEmail: dto.adminEmail,
                domain: domain,
                token: dto.token
            })
        );

        this.sendMail({
            to: dto.userEmail,
            subject: NotificationSubject.USER_INVITATION,
            html: html
        });
    }
}
