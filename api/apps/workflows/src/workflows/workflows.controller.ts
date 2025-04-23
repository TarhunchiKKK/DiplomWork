import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    ICreateWorkflowDto,
    IDeleteWorkflowDto,
    IFindOneWorkflowByDocumentIdDto,
    IStartWorkflowDto,
    UnwrapGrpcResponse,
    WorkflowsServiceController,
    WorkflowsServiceControllerMethods,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { WorkflowsService } from "./workflows.service";
import { transformWorkflow } from "./helpers/grpc.helpers";

@Controller()
@WorkflowsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class WorkflowsController implements UnwrapGrpcResponse<WorkflowsServiceController> {
    public constructor(private readonly workflowsService: WorkflowsService) {}

    public async create(dto: ICreateWorkflowDto) {
        return await this.workflowsService.create(dto).then(transformWorkflow);
    }

    public async start(dto: IStartWorkflowDto) {
        await this.workflowsService.start(dto);
    }

    public async findOneByDocumentId(dto: IFindOneWorkflowByDocumentIdDto) {
        return await this.workflowsService.findOneByDocumentId(dto).then(transformWorkflow);
    }

    public async delete(dto: IDeleteWorkflowDto) {
        await this.workflowsService.delete(dto.workflowId);
    }
}
