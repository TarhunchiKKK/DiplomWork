import { Module } from "@nestjs/common";
import { MailsModule } from "common/modules";
import { PasswordRecoveryNotificationsController } from "./password-recovery-notifiations.controller";
import { PasswordRecoveryNotificationsService } from "./password-recovery-notifiations.service";

@Module({
    imports: [MailsModule],
    controllers: [PasswordRecoveryNotificationsController],
    providers: [PasswordRecoveryNotificationsService]
})
export class PasswordRecoveryNotificationsModule {}
