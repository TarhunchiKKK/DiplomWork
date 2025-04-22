import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MailsService } from "common/modules";

@Injectable()
export class DocumentNotificationsService {
    public constructor(
        private readonly mailsService: MailsService,

        private readonly configService: ConfigService
    ) {}
}
