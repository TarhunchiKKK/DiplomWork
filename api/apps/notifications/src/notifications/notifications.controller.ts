import { Controller } from "@nestjs/common";
import { NotificationsServiceController, NotificationsServiceControllerMethods } from "common/grpc";
import { NotificationsService } from "./notifications.service";

@Controller()
@NotificationsServiceControllerMethods()
export class NotificationsController implements NotificationsServiceController {
    public constructor(private readonly notificationsService: NotificationsService) {}
}
