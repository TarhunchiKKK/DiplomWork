import { Controller } from "@nestjs/common";
import { NotificationsControllerApiInfo } from "./swagger/notifications-controller-api-info.decorator";

@Controller("notifications")
@NotificationsControllerApiInfo()
export class NotificationsController {
    public constructor() {}
}
