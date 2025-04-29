import { Controller } from "@nestjs/common";
import { WorkflowParticipantsNotificationsService } from "./workflow-participants-notifications.service";
import { EventPattern } from "@nestjs/microservices";
import { ParticipantAddedRmqEvent, ParticipantDeletedRmqEvent } from "common/rabbitmq";

@Controller()
export class WorkflowParticipantsNotificationsController {
    public constructor(private readonly notificationsService: WorkflowParticipantsNotificationsService) {}

    @EventPattern(ParticipantAddedRmqEvent.PATTERN)
    public async handleParticipantAdded(event: ParticipantAddedRmqEvent) {
        await this.notificationsService.handleParticipantAdded(event);
    }

    @EventPattern(ParticipantDeletedRmqEvent.PATTERN)
    public async handleParticipantDeleted(event: ParticipantDeletedRmqEvent) {
        await this.notificationsService.handleParticipantDeleted(event);
    }
}
