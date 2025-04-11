import { Injectable } from "@nestjs/common";
import { MailNotificationsService } from "./mail-notifications/mail.notifications.service";
import { ActivateAccountEvent, DeactivateAccountEvent, ResetPasswordEvent, UserInvitationEvent } from "common/rabbitmq";

@Injectable()
export class NotificationsService {
    public constructor(private readonly mailNotificationsService: MailNotificationsService) {}

    public handleUserInvitation(dto: UserInvitationEvent) {
        return this.mailNotificationsService.sendUserInvitationMail(dto.payload);
    }

    public handleResetPassword(dto: ResetPasswordEvent) {
        return this.mailNotificationsService.sendResetPasswordMail(dto.payload);
    }

    public handleActivateAccount(dto: ActivateAccountEvent) {
        return this.mailNotificationsService.sendAccountActivationMail(dto.payload);
    }

    public handleDeactivateAccount(dto: DeactivateAccountEvent) {
        return this.mailNotificationsService.sendAccountDeactivationMail(dto.payload);
    }
}
