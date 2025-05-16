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

        private readonly notificationsRmqService: NotificationsRmqService
    ) {}

    @OnEvent(WorkflowDeletedEvent.pattern)
    public async handleWorkflowDeleted(event: WorkflowDeletedEvent) {
        const users = await firstValueFrom(
            this.usersGrpcService.call("findAllByIds", {
                ids: event.participantsIds
            })
        );

        users.users.forEach(user => {
            this.notificationsRmqService.emit(
                new WorkflowDeletedRmqEvent(event.documentTitle, { id: user.id, email: user.email })
            );
        });
    }
}
