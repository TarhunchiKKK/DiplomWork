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
import { transformWorkflow, transformWorkflowsArray } from "./helpers/grpc.helpers";

@Controller()
@WorkflowsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class WorkflowsController implements UnwrapGrpcResponse<WorkflowsServiceController> {
    public constructor(private readonly workflowsService: WorkflowsService) {}

    public async create(dto: ICreateWorkflowDto) {
        return await this.workflowsService.create(dto).then(transformWorkflow);
    }

    public async updateSigner({ workflowId, ...dto }: IUpdateSignerDto) {
        await this.workflowsService.update(workflowId, dto);
    }

    public async start({ id }: IOnlyId) {
        await this.workflowsService.start(id);
    }

    public async sign({ id }: IOnlyId) {
        await this.workflowsService.sign(id);
    }

    public async findAllByCreatorId({ id }: IOnlyId) {
        return await this.workflowsService.findAllByCreatorId(id).then(transformWorkflowsArray);
    }

    public async findOneById({ id }: IOnlyId) {
        return await this.workflowsService.findOneById(id).then(transformWorkflow);
    }

    public async findOneByDocumentId({ id }: IOnlyId) {
        return await this.workflowsService.findOneByDocumentId(id).then(transformWorkflow);
    }

    public async delete({ id }: IOnlyId) {
        await this.workflowsService.delete(id);
    }
}
