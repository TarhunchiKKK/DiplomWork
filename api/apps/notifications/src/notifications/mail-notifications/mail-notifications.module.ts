import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getMailerConfig } from "common/config";
import { MailNotificationsService } from "./mail.notifications.service";

@Module({
    imports: [
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMailerConfig
        })
    ],
    providers: [MailNotificationsService],
    exports: [MailNotificationsService]
})
export class MailNotificationsModule {}
