import { Controller } from "@nestjs/common";
import { UserNotificationsService } from "./user-notifications.service";
import { EventPattern } from "@nestjs/microservices";
import { UserInvitationEvent, ResetPasswordEvent, ActivateAccountEvent, DeactivateAccountEvent } from "common/rabbitmq";

@Controller()
export class UserNotificationsController {
    public constructor(private readonly notificationsService: UserNotificationsService) {}

    @EventPattern(UserInvitationEvent.PATTERN)
    public handleUserInvitation(event: UserInvitationEvent) {
        this.notificationsService.handleUserInvitation(event.payload);
    }

    @EventPattern(ResetPasswordEvent.PATTERN)
    public handleResetPassword(event: ResetPasswordEvent) {
        this.notificationsService.handleResetPassword(event.payload);
    }

    @EventPattern(ActivateAccountEvent.PATTERN)
    public handleActivateAccount(event: ActivateAccountEvent) {
        this.notificationsService.handleActivateAccount(event.payload);
    }

    @EventPattern(DeactivateAccountEvent.PATTERN)
    public handleDeactivateAccount(event: DeactivateAccountEvent) {
        this.notificationsService.handleDeactivateAccount(event.payload);
    }
}
