import { Module } from "@nestjs/common";
import { MailsModule } from "common/modules";
import { NotificationsModule } from "../../notifications/notifications.module";
import { WorkflowParticipantsNotificationsController } from "./workflow-participants-notifications.controller";
import { WorkflowParticipantsNotificationsService } from "./workflow-participants-notifications.service";

@Module({
    imports: [MailsModule, NotificationsModule],
    controllers: [WorkflowParticipantsNotificationsController],
    providers: [WorkflowParticipantsNotificationsService]
})
export class WorkflowParticipantsNotificationsModule {}
