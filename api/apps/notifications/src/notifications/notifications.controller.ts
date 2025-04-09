import { Controller } from "@nestjs/common";
import { NotificationsServiceController, NotificationsServiceControllerMethods } from "common/grpc";
import { NotificationsService } from "./notifications.service";
import { EventPattern } from "@nestjs/microservices";
import { UserInvitationEvent } from "common/rabbitmq";

@Controller()
@NotificationsServiceControllerMethods()
export class NotificationsController implements NotificationsServiceController {
    public constructor(private readonly notificationsService: NotificationsService) {}

    @EventPattern(UserInvitationEvent.PATTERN)
    public userInvitation(event: UserInvitationEvent) {
        this.notificationsService.userInvitation(event);
    }
}
