import { Injectable } from "@nestjs/common";
import { WorkflowParticipantsService } from "../../participants/workflow-participants.service";
import { RecalculateWorkflowStatusEvent } from "../events/recalculate-workflow-status.event";
import { OnEvent } from "@nestjs/event-emitter";
import { WorkflowParticipant } from "../../participants/entities/workflow-participant.entity";
import { WorkflowParticipantRole } from "../../participants/enums/workflow-participant-role.enum";
import { ApprovalStatus } from "../../approval/enums/approval.-status.enum";
import { WorkflowStatus } from "../enums/workflow-status.enum";
import { WorkflowsService } from "../workflows.service";
import { UpdateWorkflowDto } from "../dto/update-workflow-dto";
import { NotificationsRmqService, WorkflowCompletedRmqEvent } from "common/rabbitmq";
import { UsersGrpcService } from "common/grpc";
import { firstValueFrom } from "rxjs";

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
            if (participant.role === WorkflowParticipantRole.APPROVER) {
                return participant.approval.status === ApprovalStatus.APPROVED;
            }

            return true;
        });
    }

    private checkForCompleted(participants: WorkflowParticipant[]) {
        return participants.every(participant => {
            if (participant.role === WorkflowParticipantRole.SIGNER) {
                return participant.approval.status === ApprovalStatus.SIGNED;
            }

            return true;
        });
    }

    private checkForRejected(participants: WorkflowParticipant[]) {
        return participants.some(participant => participant.approval.status === ApprovalStatus.REJECTED);
    }

    private getUpdateWorkflowDto(participants: WorkflowParticipant[]) {
        let dto: UpdateWorkflowDto | null = null;

        if (this.checkForCompleted(participants)) {
            dto = { status: WorkflowStatus.COMPLETED, completedAt: new Date() };
        } else if (this.checkForFullyApproved(participants)) {
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

            if (dto.status === WorkflowStatus.COMPLETED) {
                this.handleWorkflowCompletedEvent(event.workflowId);
            }
        }
    }

    public async handleWorkflowCompletedEvent(workflowId: string) {
        const workflow = await this.workflowsService.findOneById(workflowId);

        const user = await firstValueFrom(
            this.usersGrpcService.call("findOne", {
                id: workflow.creatorId
            })
        );

        this.notificationsRmqService.emit(
            new WorkflowCompletedRmqEvent(workflow.title, { id: user.id, email: user.email })
        );
    }
}
