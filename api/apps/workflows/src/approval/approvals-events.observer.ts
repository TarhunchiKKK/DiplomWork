import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { ApprovalUpsertedEvent } from "./events/approval-upserted.event";
import { firstValueFrom } from "rxjs";
import { DocumentsGrpcService, UsersGrpcService } from "common/grpc";
import { WorkflowParticipantsService } from "../participants/workflow-participants.service";
import { NotificationsRmqService } from "common/rabbitmq";
import { approvalRmqEventsMap } from "./constants/rmq.constants";

@Injectable()
export class ApprovalsEventsObserver {
    public constructor(
        private readonly participantsService: WorkflowParticipantsService,

        private readonly usersGrpcService: UsersGrpcService,

        private readonly notificationsRmqService: NotificationsRmqService
    ) {}

    private async getParticipantData(participantId: string) {
        const participant = await this.participantsService.findOneById(participantId);

        const [participantUser, workflowOwner] = await Promise.all([
            firstValueFrom(
                this.usersGrpcService.call("findOne", {
                    id: participant.userId
                })
            ),
            firstValueFrom(
                this.usersGrpcService.call("findOne", {
                    id: participant.workflow.creatorId
                })
            )
        ]);

        return {
            participant,
            participantUser,
            workflowOwner
        };
    }

    @OnEvent(ApprovalUpsertedEvent.pattern)
    public async handleApprovalUpserted(event: ApprovalUpsertedEvent) {
        const { participant, participantUser, workflowOwner } = await this.getParticipantData(event.participantId);

        const RmqEventConstructor = approvalRmqEventsMap.get(participant.approval.status);
        if (!RmqEventConstructor) {
            this.notificationsRmqService.emit(
                new RmqEventConstructor(
                    event.workflowDocumentTitle,
                    { id: workflowOwner.id, email: workflowOwner.email },
                    participantUser.username ?? participantUser.email
                )
            );
        }
    }
}
