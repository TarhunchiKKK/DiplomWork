import { Module } from "@nestjs/common";
import { MailsModule } from "common/modules";
import { NotificationsModule } from "../notifications/notifications.module";
import { WorkflowsNotificationsController } from "./workflows-notifications.controller";
import { WorkflowsNotificationsService } from "./workflows-notifications.service";
import { WorkflowParticipantsNotificationsModule } from "./participants/workflow-participants-notifications.module";

@Module({
    imports: [MailsModule, NotificationsModule, WorkflowParticipantsNotificationsModule],
    controllers: [WorkflowsNotificationsController],
    providers: [WorkflowsNotificationsService]
})
export class WorkflowsNotificationsModule {}
