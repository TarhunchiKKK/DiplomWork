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
    public handleUserhandleUserInvitedInvitation(event: UserInvitedRqmEvent) {
        this.notificationsService.handleUserInvited(event.payload);
    }

    @EventPattern(PasswordResetedRmqEvent.PATTERN)
    public handlePasswordReseted(event: PasswordResetedRmqEvent) {
        this.notificationsService.handlePasswordReseted(event.payload);
    }

    @EventPattern(AccountActivatedRmqEvent.PATTERN)
    public handleAccountActivated(event: AccountActivatedRmqEvent) {
        this.notificationsService.handleAccountActivated(event.payload);
    }

    @EventPattern(AccountDeactivatedRmqEvent.PATTERN)
    public handleAccountDeactivated(event: AccountDeactivatedRmqEvent) {
        this.notificationsService.handleAccountDeactivated(event.payload);
    }
}
