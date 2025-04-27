import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { DocumentsGrpcService, UsersGrpcService } from "common/grpc";
import { ParticipantsCreatedEvent } from "./events/participants-created.event";
import { firstValueFrom } from "rxjs";
import { NotificationsRmqService, ParticipantAddedRmqEvent, ParticipantDeletedRmqEvent } from "common/rabbitmq";
import { ParticipantsDeletedEvent } from "./events/participants-deleted.event";

@Injectable()
export class WorkflowParticipantsObserver {
    public constructor(
        private readonly usersGrpcService: UsersGrpcService,

        private readonly documentsGrpcService: DocumentsGrpcService,

        private readonly notificationsRmqService: NotificationsRmqService
    ) {}

    private async getWorkflowInfo(documentId: string, usersIds: string[]) {
        const [document, users] = await Promise.all([
            firstValueFrom(
                this.documentsGrpcService.call("findOneById", {
                    id: documentId
                })
            ),
            firstValueFrom(
                this.usersGrpcService.call("findAllByIds", {
                    ids: usersIds
                })
            )
        ]);

        return { document, users };
    }

    @OnEvent(ParticipantsCreatedEvent.PATTERN)
    public async handleParticipantsCreated(event: ParticipantsCreatedEvent) {
        const { users, document } = await this.getWorkflowInfo(event.documentId, event.usersIds);

        users.users.forEach(user => {
            this.notificationsRmqService.emit(new ParticipantAddedRmqEvent(document.title, user.email));
        });
    }

    @OnEvent(ParticipantsDeletedEvent.PATTERN)
    public async handleParticipantsDeleted(event: ParticipantsCreatedEvent) {
        const { users, document } = await this.getWorkflowInfo(event.documentId, event.usersIds);

        users.users.forEach(user => {
            this.notificationsRmqService.emit(new ParticipantDeletedRmqEvent(document.title, user.email));
        });
    }
}
