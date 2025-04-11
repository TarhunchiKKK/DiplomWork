import { Controller } from "@nestjs/common";
import { NotificationsServiceController, NotificationsServiceControllerMethods } from "common/grpc";
import { NotificationsService } from "./notifications.service";
import { EventPattern } from "@nestjs/microservices";
import { ActivateAccountEvent, DeactivateAccountEvent, ResetPasswordEvent, UserInvitationEvent } from "common/rabbitmq";

@Controller()
@NotificationsServiceControllerMethods()
export class NotificationsController implements NotificationsServiceController {
    public constructor(private readonly notificationsService: NotificationsService) {}

    @EventPattern(UserInvitationEvent.PATTERN)
    public handleUserInvitation(event: UserInvitationEvent) {
        this.notificationsService.handleUserInvitation(event);
    }

    @EventPattern(ResetPasswordEvent.PATTERN)
    public handleResetPassword(event: ResetPasswordEvent) {
        this.notificationsService.handleResetPassword(event);
    }

    @EventPattern(ActivateAccountEvent.PATTERN)
    public handleActivateAccount(event: ActivateAccountEvent) {
        this.notificationsService.handleActivateAccount(event);
    }

    @EventPattern(DeactivateAccountEvent.PATTERN)
    public handleDeactivateAccount(event: DeactivateAccountEvent) {
        this.notificationsService.handleDeactivateAccount(event);
    }
}
