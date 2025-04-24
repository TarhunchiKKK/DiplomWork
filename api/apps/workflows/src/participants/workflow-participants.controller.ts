import { Controller, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    IUpsertManyParticipantsDto,
    UnwrapGrpcResponse,
    WorkflowParticipantsServiceController,
    WorkflowParticipantsServiceControllerMethods,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { WorkflowParticipantsService } from "./workflow-participants.service";
import { ISaveParticipantDto } from "./dto/save-participant.dto";
import { ExtractFromRequest } from "common/middleware";
import { WorkflowCreatorGuard } from "../workflows/middleware/workflow-creator.guard";

@Controller()
@WorkflowParticipantsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class WorkflowParticipantsController implements UnwrapGrpcResponse<WorkflowParticipantsServiceController> {
    public constructor(private readonly participantsService: WorkflowParticipantsService) {}

    @ExtractFromRequest((request: IUpsertManyParticipantsDto) => ({
        userId: request.userId,
        workflowId: request.workflowId
    }))
    @UseGuards(WorkflowCreatorGuard)
    public async upsertMany(dto: IUpsertManyParticipantsDto) {
        await this.participantsService.upsertMany(dto.workflowId, dto.participants as ISaveParticipantDto[]);
    }
}
