import { Controller } from "@nestjs/common";
import { UserNotificationsService } from "./user-notifications.service";
import { EventPattern } from "@nestjs/microservices";
import {
    UserInvitedRqmEvent,
    PasswordResetedRmqEvent,
    AccountActivatedRmqEvent,
    AccountDeactivatedRmqEvent
} from "common/rabbitmq";

@Controller()
export class UserNotificationsController {
    public constructor(private readonly notificationsService: UserNotificationsService) {}

    @EventPattern(UserInvitedRqmEvent.PATTERN)
    public handleUserInvitation(event: UserInvitedRqmEvent) {
        this.notificationsService.handleUserInvitation(event.payload);
    }

    @EventPattern(PasswordResetedRmqEvent.PATTERN)
    public handleResetPassword(event: PasswordResetedRmqEvent) {
        this.notificationsService.handleResetPassword(event.payload);
    }

    @EventPattern(AccountActivatedRmqEvent.PATTERN)
    public handleActivateAccount(event: AccountActivatedRmqEvent) {
        this.notificationsService.handleActivateAccount(event.payload);
    }

    @EventPattern(AccountDeactivatedRmqEvent.PATTERN)
    public handleDeactivateAccount(event: AccountDeactivatedRmqEvent) {
        this.notificationsService.handleDeactivateAccount(event.payload);
    }
}
