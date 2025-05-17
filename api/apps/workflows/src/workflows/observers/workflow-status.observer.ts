import { Injectable } from "@nestjs/common";
import { WorkflowParticipantsService } from "../../participants/workflow-participants.service";
import { RecalculateWorkflowStatusEvent } from "../events/recalculate-workflow-status.event";
import { OnEvent } from "@nestjs/event-emitter";
import { WorkflowParticipant } from "../../participants/entities/workflow-participant.entity";
import { ApprovalStatus } from "../../approval/enums/approval.-status.enum";
import { WorkflowStatus } from "../enums/workflow-status.enum";
import { WorkflowsService } from "../workflows.service";
import { UpdateWorkflowDto } from "../dto/update-workflow-dto";
import { NotificationsRmqService, WorkflowCompletedRmqEvent } from "common/rabbitmq";
import { UsersGrpcService } from "common/grpc";
import { firstValueFrom } from "rxjs";
import { WorkflowCompletedEvent } from "../events/workflow-completeed.events";

@Injectable()
export class WorkflowStatusObserver {
    public constructor(
        private readonly workflowsService: WorkflowsService,

        private readonly participantsService: WorkflowParticipantsService,

        private readonly notificationsRmqService: NotificationsRmqService,

        private readonly usersGrpcService: UsersGrpcService
    ) {}

    private checkForFullyApproved(participants: WorkflowParticipant[]) {
        return participants.every(participant => {
            return participant.approval.status === ApprovalStatus.APPROVED;
        });
    }

    private checkForRejected(participants: WorkflowParticipant[]) {
        return participants.some(participant => participant.approval.status === ApprovalStatus.REJECTED);
    }

    private getUpdateWorkflowDto(participants: WorkflowParticipant[]) {
        let dto: UpdateWorkflowDto | null = null;

        if (this.checkForFullyApproved(participants)) {
            dto = { status: WorkflowStatus.FULLY_APPROVED };
        } else if (this.checkForRejected(participants)) {
            dto = { status: WorkflowStatus.REJECTED };
        }

        return dto;
    }

    @OnEvent(RecalculateWorkflowStatusEvent.pattern)
    public async handleRecalculateWorkflowStatus(event: RecalculateWorkflowStatusEvent) {
        const participants = await this.participantsService.findAllByWorkflowId(event.workflowId);

        const dto = this.getUpdateWorkflowDto(participants);

        if (dto) {
            await this.workflowsService.update(event.workflowId, dto);
        }
    }

    @OnEvent(WorkflowCompletedEvent.pattern)
    public async handleWorkflowCompletedEvent(event: WorkflowCompletedEvent) {
        const workflow = await this.workflowsService.findOneById(event.workflowId);

        const user = await firstValueFrom(
            this.usersGrpcService.call("findOne", {
                id: workflow.creatorId
            })
        );

        this.notificationsRmqService.emit(
            new WorkflowCompletedRmqEvent(workflow.documentTitle, { id: user.id, email: user.email })
        );
    }
}
