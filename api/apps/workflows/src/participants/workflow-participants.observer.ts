import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { UsersGrpcService } from "common/grpc";
import { ParticipantsCreatedEvent } from "./events/participants-created.event";
import { firstValueFrom } from "rxjs";
import { NotificationsRmqService, ParticipantAddedRmqEvent, ParticipantDeletedRmqEvent } from "common/rabbitmq";
import { ParticipantsDeletedEvent } from "./events/participants-deleted.event";

@Injectable()
export class WorkflowParticipantsObserver {
    public constructor(
        private readonly usersGrpcService: UsersGrpcService,

        private readonly notificationsRmqService: NotificationsRmqService
    ) {}

    @OnEvent(ParticipantsCreatedEvent.PATTERN)
    public async handleParticipantsCreated(event: ParticipantsCreatedEvent) {
        const users = await firstValueFrom(
            this.usersGrpcService.call("findAllByIds", {
                ids: event.participantsIds
            })
        );

        users.users.forEach(user => {
            this.notificationsRmqService.emit(
                new ParticipantAddedRmqEvent(event.workflowDocumentTitle, { id: user.id, email: user.email })
            );
        });
    }

    @OnEvent(ParticipantsDeletedEvent.PATTERN)
    public async handleParticipantsDeleted(event: ParticipantsCreatedEvent) {
        const users = await firstValueFrom(
            this.usersGrpcService.call("findAllByIds", {
                ids: event.participantsIds
            })
        );

        users.users.forEach(user => {
            this.notificationsRmqService.emit(
                new ParticipantDeletedRmqEvent(event.workflowDocumentTitle, { id: user.id, email: user.email })
            );
        });
    }
}
