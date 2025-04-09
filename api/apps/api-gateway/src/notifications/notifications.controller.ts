import { Body, Controller, Post } from "@nestjs/common";
import { UserInvitationDto } from "apps/notifications/src/notifications/dto/user-invitation.dto";
import { NotificationsGrpcService } from "common/grpc";
import { NotificationsControllerApi } from "./swagger/notifications-controller-api.decorator";

@Controller("notifications")
@NotificationsControllerApi()
export class NotificationsController {
    public constructor(private readonly notificationsGrpcService: NotificationsGrpcService) {}

    @Post("/invitation")
    public userInvitation(@Body() dto: UserInvitationDto) {
        return this.notificationsGrpcService.userInvitation(dto);
    }
}
