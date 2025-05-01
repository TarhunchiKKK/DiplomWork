import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { WorkflowsGrpcService } from "common/grpc";
import { AuthenticationGuard, ExtractFromRequest } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { DocumentAuthorGuard } from "./middleware/document-author.guard";
import { WorkflowCreatorGuard } from "./middleware/workflow-creator.guard";
import { CreateWorkflowDto } from "./dto/create-workflow.dto";
import { UpdateWorkflowDto } from "./dto/update-workflow.dto";

@Controller("/workflows")
@UseGuards(AuthenticationGuard)
export class WorkflowsController {
    public constructor(private readonly workflowsGrpcService: WorkflowsGrpcService) {}

    @Post()
    @ExtractFromRequest(request => request.params.documentId)
    @UseGuards(DocumentAuthorGuard)
    public create(@Req() request: TAuthenticatedRequest, @Body() dto: CreateWorkflowDto) {
        return this.workflowsGrpcService.call("create", {
            ...dto,
            userId: request.jwtInfo.id
        });
    }

    @Post("/start/:workflowId")
    @ExtractFromRequest(request => request.params.workflowId)
    @UseGuards(WorkflowCreatorGuard)
    public start(@Param("workflowId") workflowId: string) {
        return this.workflowsGrpcService.call("start", {
            id: workflowId
        });
    }

    @Get("/documents/:documentId")
    public findOneByDocumentId(@Param("documentId") documentId: string) {
        return this.workflowsGrpcService.call("findOneByDocumentId", {
            id: documentId
        });
    }

    @Patch(":workflowId")
    @ExtractFromRequest(request => request.params.workflowId)
    @UseGuards(WorkflowCreatorGuard)
    @UsePipes(ValidationPipe)
    public update(@Param("workflowId") workflowId: string, @Body() dto: UpdateWorkflowDto) {
        return this.workflowsGrpcService.call("update", {
            ...dto,
            id: workflowId
        });
    }

    @Delete(":workflowId")
    @ExtractFromRequest(request => request.params.workflowId)
    @UseGuards(WorkflowCreatorGuard)
    public delete(@Param("workflowId") workflowId: string) {
        return this.workflowsGrpcService.call("delete", {
            id: workflowId
        });
    }

    @Get("/user/:userId")
    public async findAllByCreatorId(@Param("userId") userId: string) {
        return this.workflowsGrpcService.call("findAllByCreatorId", {
            id: userId
        });
    }
}
