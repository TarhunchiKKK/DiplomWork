import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { UsersGrpcService } from "common/grpc";
import { ParticipantsCreatedEvent } from "./events/participants-created.event";
import { firstValueFrom } from "rxjs";
import { RmqClient, ParticipantAddedRmqEvent, ParticipantDeletedRmqEvent } from "common/rabbitmq";
import { ParticipantsDeletedEvent } from "./events/participants-deleted.event";

@Injectable()
export class WorkflowParticipantsObserver {
    public constructor(
        private readonly usersGrpcService: UsersGrpcService,

        private readonly rmqClient: RmqClient
    ) {}

    @OnEvent(ParticipantsCreatedEvent.PATTERN)
    public async handleParticipantsCreated(event: ParticipantsCreatedEvent) {
        const users = await firstValueFrom(
            this.usersGrpcService.call("findAllByIds", {
                ids: event.participantsIds
            })
        );

        users.users.forEach(user => {
            this.rmqClient.emit(
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
            this.rmqClient.emit(
                new ParticipantDeletedRmqEvent(event.workflowDocumentTitle, { id: user.id, email: user.email })
            );
        });
    }
}
