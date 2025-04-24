import { Controller, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    IUpsertWorkflowParticipantsDto,
    UnwrapGrpcResponse,
    WorkflowParticipantsServiceController,
    WorkflowParticipantsServiceControllerMethods,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { WorkflowParticipantsService } from "./workflow-participants.service";
import { ExtractFromRequest } from "common/middleware";
import { WorkflowCreatorGuard } from "../workflows/middleware/workflow-creator.guard";

@Controller()
@WorkflowParticipantsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class WorkflowParticipantsController implements UnwrapGrpcResponse<WorkflowParticipantsServiceController> {
    public constructor(private readonly participantsService: WorkflowParticipantsService) {}

    @ExtractFromRequest((request: IUpsertWorkflowParticipantsDto) => ({
        userId: request.userId,
        workflowId: request.workflowId
    }))
    @UseGuards(WorkflowCreatorGuard)
    public async upsertWorkflowParticipants(dto: IUpsertWorkflowParticipantsDto) {
        await this.participantsService.upsertWorkflowParticipants(dto.workflowId, dto.participants);
    }
}
