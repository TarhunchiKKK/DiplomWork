import { Controller } from "@nestjs/common";
import { NotificationsServiceController, NotificationsServiceControllerMethods } from "common/grpc";
import { NotificationsService } from "./notifications.service";
import { UserInvitationDto } from "./dto/user-invitation.dto";

@Controller()
@NotificationsServiceControllerMethods()
export class NotificationsController implements NotificationsServiceController {
    public constructor(private readonly notificationsService: NotificationsService) {}

    public userInvitation(dto: UserInvitationDto) {
        this.notificationsService.userInvitation(dto);
    }
}
