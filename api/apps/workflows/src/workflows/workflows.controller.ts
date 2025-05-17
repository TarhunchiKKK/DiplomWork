import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    ICreateWorkflowDto,
    IOnlyId,
    IUpdateSignerDto,
    UnwrapGrpcResponse,
    WorkflowsServiceController,
    WorkflowsServiceControllerMethods,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { WorkflowsService } from "./workflows.service";
import { transformFullWorkflow, transformWorkflow, transformWorkflowsArray } from "./helpers/grpc.helpers";

@Controller()
@WorkflowsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class WorkflowsController implements UnwrapGrpcResponse<WorkflowsServiceController> {
    public constructor(private readonly workflowsService: WorkflowsService) {}

    public async create(dto: ICreateWorkflowDto) {
        return await this.workflowsService.create(dto).then(transformWorkflow);
    }

    public async updateSigner(dto: IUpdateSignerDto) {
        const { id, ...data } = dto;
        await this.workflowsService.update(id, data);
    }

    public async start(dto: IOnlyId) {
        await this.workflowsService.start(dto.id);
    }

    public async sign(dto: IOnlyId) {
        await this.workflowsService.sign(dto.id);
    }

    public async findAllByCreatorId(dto: IOnlyId) {
        return await this.workflowsService.findAllByCreatorId(dto.id).then(transformWorkflowsArray);
    }

    public async findOneById(dto: IOnlyId) {
        return await this.workflowsService.findOneById(dto.id).then(transformFullWorkflow);
    }

    public async findOneByDocumentId(dto: IOnlyId) {
        return await this.workflowsService.findOneByDocumentId(dto.id).then(transformFullWorkflow);
    }

    public async delete(dto: IOnlyId) {
        await this.workflowsService.delete(dto.id);
    }
}
