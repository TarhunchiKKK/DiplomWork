import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    ICreateWorkflowDto,
    IOnlyId,
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

    public async start(dto: IOnlyId) {
        await this.workflowsService.start(dto);
    }

    public async findOneById(dto: IOnlyId) {
        return await this.workflowsService.findOneById(dto.id).then(transformWorkflow);
    }

    public async findOneByDocumentId(dto: IOnlyId) {
        return await this.workflowsService.findOneByDocumentId(dto).then(transformWorkflow);
    }

    public async delete(dto: IOnlyId) {
        await this.workflowsService.delete(dto.id);
    }
}
