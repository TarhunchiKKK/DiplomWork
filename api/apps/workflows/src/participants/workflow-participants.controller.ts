import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    UnwrapGrpcResponse,
    WorkflowParticipantsServiceController,
    WorkflowParticipantsServiceControllerMethods,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { WorkflowParticipantsService } from "./workflow-participants.service";

@Controller()
@WorkflowParticipantsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class WorkflowParticipantsController implements UnwrapGrpcResponse<WorkflowParticipantsServiceController> {
    public constructor(private readonly participantsService: WorkflowParticipantsService) {}
}
