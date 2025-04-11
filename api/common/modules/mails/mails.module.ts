import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailsService } from "./mails.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MailerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.getOrThrow<string>("MAIL_HOST"),
                    port: configService.getOrThrow<number>("MAIL_PORT"),
                    auth: {
                        user: configService.getOrThrow<string>("MAIL_LOGIN"),
                        pass: configService.getOrThrow<string>("MAIL_PASSWORD")
                    }
                },
                defaults: {
                    from: `"E-Doc-Hub Team" ${configService.getOrThrow<string>("MAIL_LOGIN")}`
                }
            })
        })
    ],
    providers: [MailsService],
    exports: [MailsService]
})
export class MailsModule {}
