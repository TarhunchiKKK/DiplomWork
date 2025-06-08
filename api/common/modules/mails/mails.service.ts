import { Injectable } from "@nestjs/common";
import { ISendMailDto } from "./dto/send-mail.dto";
import { Resend } from "resend";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MailsService {
    private readonly resend: Resend;

    private readonly from: string;

    public constructor(private readonly configService: ConfigService) {
        this.resend = new Resend(this.configService.getOrThrow<string>("MAILS_KEY"));

        this.from = this.configService.getOrThrow<string>("MAILS_FROM");
    }

    public sendMail(dto: ISendMailDto) {
        try {
            this.resend.emails.send({
                ...dto,
                from: this.from
            });
        } catch (error: unknown) {
            console.log("SMTP error:");
            console.error(error);
        }
    }
}
