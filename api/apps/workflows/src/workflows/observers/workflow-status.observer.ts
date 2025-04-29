import { Injectable } from "@nestjs/common";
import { WorkflowParticipantsService } from "../../participants/workflow-participants.service";
import { RecalculateWorkflowStatusEvent } from "../events/recalculate-workflow-status.event";
import { OnEvent } from "@nestjs/event-emitter";
import { WorkflowParticipant } from "../../participants/entities/workflow-participant.entity";
import { WorkflowParticipantRole } from "../../participants/enums/workflow-participant-role.enum";
import { ApprovalStatus } from "../../approval/enums/approval.-status.enum";
import { WorkflowStatus } from "../enums/workflow-status.enum";
import { WorkflowsService } from "../workflows.service";

@Injectable()
export class WorkflowStatusObserver {
    public constructor(
        private readonly workflowsService: WorkflowsService,

        private readonly participantsService: WorkflowParticipantsService
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

    @OnEvent(RecalculateWorkflowStatusEvent.pattern)
    public async handleRecalculateWorkflowStatus(event: RecalculateWorkflowStatusEvent) {
        const participants = await this.participantsService.findAllByWorkflowId(event.workflowId);

        let newStatus: WorkflowStatus | null = null;

        if (this.checkForCompleted(participants)) {
            newStatus = WorkflowStatus.COMPLETED;
        } else if (this.checkForFullyApproved(participants)) {
            newStatus = WorkflowStatus.FULLY_APPROVED;
        } else if (this.checkForRejected(participants)) {
            newStatus = WorkflowStatus.REJECTED;
        }

        if (newStatus) {
            await this.workflowsService.update(event.workflowId, {
                status: newStatus
            });
        }
    }
}
