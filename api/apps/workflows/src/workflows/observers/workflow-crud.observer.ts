import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { UsersGrpcService, DocumentsGrpcService } from "common/grpc";
import { NotificationsRmqService, WorkflowDeletedRmqEvent } from "common/rabbitmq";
import { firstValueFrom } from "rxjs";
import { WorkflowDeletedEvent } from "../events/workflow-deleted.event";

@Injectable()
export class WorkflowCrudObserver {
    public constructor(
        private readonly usersGrpcService: UsersGrpcService,

        private readonly documentsGrpcService: DocumentsGrpcService,

        private readonly notificationsRmqService: NotificationsRmqService
    ) {}

    private async getWorkflowInfo(documentId: string, participantsIds: string[]) {
        const [document, users] = await Promise.all([
            firstValueFrom(
                this.documentsGrpcService.call("findOneById", {
                    id: documentId
                })
            ),
            firstValueFrom(
                this.usersGrpcService.call("findAllByIds", {
                    ids: participantsIds
                })
            )
        ]);

        return { document, users };
    }

    @OnEvent(WorkflowDeletedEvent.pattern)
    public async handleWorkflowDeleted(event: WorkflowDeletedEvent) {
        const { document, users } = await this.getWorkflowInfo(event.documentId, event.participantsIds);

        users.users.forEach(user => {
            this.notificationsRmqService.emit(
                new WorkflowDeletedRmqEvent(document.title, { id: user.id, email: user.email })
            );
        });
    }
}
