import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    IOnlyId,
    IUpsertWorkflowParticipantsDto,
    UnwrapGrpcResponse,
    WorkflowParticipantsServiceController,
    WorkflowParticipantsServiceControllerMethods,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { WorkflowParticipantsService } from "./workflow-participants.service";
import { transformWorkflowsArray } from "../workflows/helpers/grpc.helpers";

@Controller()
@WorkflowParticipantsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class WorkflowParticipantsController implements UnwrapGrpcResponse<WorkflowParticipantsServiceController> {
    public constructor(private readonly participantsService: WorkflowParticipantsService) {}

    public async findAllUserWorkflows(dto: IOnlyId) {
        return await this.participantsService.findAllUserWorkflows(dto.id).then(transformWorkflowsArray);
    }

    public async upsertWorkflowParticipants(dto: IUpsertWorkflowParticipantsDto) {
        await this.participantsService.upsertWorkflowParticipants(dto.workflowId, dto.participants);
    }
}
