import { Controller } from "@nestjs/common";
import { UserInvitationNotificationsService } from "./user-invitation-notifications.service";
import { UserInvitedRqmEvent } from "common/rabbitmq";
import { EventPattern, Payload } from "@nestjs/microservices";

@Controller()
export class UserInvitationNotificationsController {
    public constructor(private readonly notificationsService: UserInvitationNotificationsService) {}

    @EventPattern(UserInvitedRqmEvent.PATTERN)
    public async handleUserInvited(@Payload() event: UserInvitedRqmEvent) {
        await this.notificationsService.handleUserInvited(event);
    }
}
