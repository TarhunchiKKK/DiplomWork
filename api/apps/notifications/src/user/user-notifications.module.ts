import { Module } from "@nestjs/common";
import { UserInvitationNotificationsModule } from "./user-invitation/user-invitation-notifications.module";
import { PasswordRecoveryNotificationsModule } from "./password-recovery/password-recovery-notifiations.module";
import { AccountDeactivationNotificationsModule } from "./account-deactivation/account-deactivation-notifications.module";

@Module({
    imports: [
        UserInvitationNotificationsModule,
        PasswordRecoveryNotificationsModule,
        AccountDeactivationNotificationsModule
    ]
})
export class UserNotificationsModule {}
