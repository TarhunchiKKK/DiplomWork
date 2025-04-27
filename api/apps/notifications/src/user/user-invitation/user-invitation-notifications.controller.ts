import { Controller } from "@nestjs/common";
import { UserInvitationNotificationsService } from "./user-invitation-notifications.service";
import { UserInvitedRqmEvent } from "common/rabbitmq";
import { EventPattern } from "@nestjs/microservices";

@Controller()
export class UserInvitationNotificationsController {
    public constructor(private readonly notificationsService: UserInvitationNotificationsService) {}

    @EventPattern(UserInvitedRqmEvent.PATTERN)
    public handleUserInvited(event: UserInvitedRqmEvent) {
        this.notificationsService.handleUserInvited(event.payload);
    }
}
