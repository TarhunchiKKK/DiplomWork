import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { GrpcExceptionFilter, WrapGrpcResponseInterceptor } from "common/grpc";
import { WorkflowParticipantsService } from "./workflow-participants.service";

@Controller()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class WorkflowParticipantsController {
    public constructor(private readonly participantsService: WorkflowParticipantsService) {}
}
