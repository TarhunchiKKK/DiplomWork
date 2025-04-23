import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { GrpcExceptionFilter, WrapGrpcResponseInterceptor } from "common/grpc";
import { WorkflowsService } from "./workflows.service";

@Controller()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class WorkflowsController {
    public constructor(private readonly workflowsService: WorkflowsService) {}
}
