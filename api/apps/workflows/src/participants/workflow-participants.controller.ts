import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    IOnlyId,
    IUpdateApprovalStatusDto,
    IUpsertWorkflowParticipantsDto,
    UnwrapGrpcResponse,
    WorkflowParticipantsServiceController,
    WorkflowParticipantsServiceControllerMethods,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { WorkflowParticipantsService } from "./workflow-participants.service";
import { transformWorkflowsArray } from "../workflows/helpers/grpc.helpers";
import { ApprovalStatus } from "./enums/approval.-status.enum";

@Controller()
@WorkflowParticipantsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class WorkflowParticipantsController implements UnwrapGrpcResponse<WorkflowParticipantsServiceController> {
    public constructor(private readonly participantsService: WorkflowParticipantsService) {}

    public async findAllUserWorkflows({ id }: IOnlyId) {
        return await this.participantsService.findAllUserWorkflows(id).then(transformWorkflowsArray);
    }

    public async upsertWorkflowParticipants({ workflowId, participants }: IUpsertWorkflowParticipantsDto) {
        await this.participantsService.upsertWorkflowParticipants(workflowId, participants);
    }

    public async updateApprovalStatus({ id, approvalStatus }: IUpdateApprovalStatusDto) {
        await this.participantsService.updateApprovalStatus(id, approvalStatus as ApprovalStatus);
    }
}
