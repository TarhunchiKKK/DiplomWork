import { Module } from "@nestjs/common";
import { NotificationsModule } from "apps/api-gateway/src/notifications/notifications.module";
import { ApprovalsNotificationsController } from "./approvals-notifications.controller";
import { ApprovalsnotificationsService } from "./approvals-notifications.service";

@Module({
    imports: [NotificationsModule],
    controllers: [ApprovalsNotificationsController],
    providers: [ApprovalsnotificationsService]
})
export class ApprovalsNotificationsModule {}
