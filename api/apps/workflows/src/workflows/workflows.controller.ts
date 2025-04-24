import { Controller, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    ICreateWorkflowDto,
    IDeleteWorkflowDto,
    IFindOneWorkflowByDocumentIdDto,
    IStartWorkflowDto,
    IUpsertWorkflowParticipantsDto,
    UnwrapGrpcResponse,
    WorkflowsServiceController,
    WorkflowsServiceControllerMethods,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { WorkflowsService } from "./workflows.service";
import { transformWorkflow } from "./helpers/grpc.helpers";
import { ExtractFromRequest } from "common/middleware";
import { DocumentAuthorGuard } from "./middleware/document-author.guard";
import { WorkflowCreatorGuard } from "./middleware/workflow-creator.guard";
import { ISaveParticipantDto } from "../participants/dto/save-participant.dto";

@Controller()
@WorkflowsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class WorkflowsController implements UnwrapGrpcResponse<WorkflowsServiceController> {
    public constructor(private readonly workflowsService: WorkflowsService) {}

    @ExtractFromRequest((request: ICreateWorkflowDto) => ({
        userId: request.userId,
        documentId: request.documentId
    }))
    @UseGuards(DocumentAuthorGuard)
    public async create(dto: ICreateWorkflowDto) {
        return await this.workflowsService.create(dto).then(transformWorkflow);
    }

    @ExtractFromRequest((request: IStartWorkflowDto) => ({
        userId: request.userId,
        workflowId: request.workflowId
    }))
    @UseGuards(WorkflowCreatorGuard)
    public async start(dto: IStartWorkflowDto) {
        await this.workflowsService.start(dto);
    }

    public async findOneByDocumentId(dto: IFindOneWorkflowByDocumentIdDto) {
        return await this.workflowsService.findOneByDocumentId(dto).then(transformWorkflow);
    }

    @ExtractFromRequest((request: IStartWorkflowDto) => ({
        userId: request.userId,
        workflowId: request.workflowId
    }))
    @UseGuards(WorkflowCreatorGuard)
    public async delete(dto: IDeleteWorkflowDto) {
        await this.workflowsService.delete(dto.workflowId);
    }

    @ExtractFromRequest((request: IUpsertWorkflowParticipantsDto) => ({
        userId: request.userId,
        workflowId: request.workflowId
    }))
    @UseGuards(WorkflowCreatorGuard)
    public async upsertParticipants(dto: IUpsertWorkflowParticipantsDto) {
        await this.workflowsService.upsertParticipants(dto.workflowId, dto.participants as ISaveParticipantDto[]);
    }
}
