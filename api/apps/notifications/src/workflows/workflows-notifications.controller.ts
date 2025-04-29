import { Controller } from "@nestjs/common";
import { WorkflowsNotificationsService } from "./workflows-notifications.service";
import { EventPattern } from "@nestjs/microservices";
import { WorkflowCompletedRmqEvent, WorkflowDeletedRmqEvent } from "common/rabbitmq";

@Controller()
export class WorkflowsNotificationsController {
    public constructor(private readonly notificationsService: WorkflowsNotificationsService) {}

    @EventPattern(WorkflowDeletedRmqEvent.PATTERN)
    public async handleWorkflowDeleted(event: WorkflowDeletedRmqEvent) {
        await this.notificationsService.handleWorkflowDeleted(event.payload);
    }

    @EventPattern(WorkflowCompletedRmqEvent.PATTERN)
    public async handleWorkflowCompleted(event: WorkflowCompletedRmqEvent) {
        await this.notificationsService.handleWorkflowCompleted(event.payload);
    }
}
