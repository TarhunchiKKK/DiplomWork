import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { ISendMailDto } from "./dto/send-mail.dto";

@Injectable()
export class MailsService {
    public constructor(readonly mailerService: MailerService) {}

    public sendMail(dto: ISendMailDto) {
        try {
            this.mailerService.sendMail({
                to: dto.to,
                subject: dto.subject,
                html: dto.html
            });
        } catch (error: unknown) {
            console.log("SMTP error:");
            console.error(error);
        }
    }
}
