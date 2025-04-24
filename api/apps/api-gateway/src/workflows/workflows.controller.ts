import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { WorkflowsGrpcService } from "common/grpc";
import { AuthenticationGuard, ExtractFromRequest } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { CreateWorkflowDto } from "./dto/create-workflow.dto";
import { DocumentAuthorGuard } from "./middleware/document-author.guard";
import { WorkflowCreatorGuard } from "./middleware/workflow-creator.guard";

@Controller("/workflows")
@UseGuards(AuthenticationGuard)
export class WorkflowsController {
    public constructor(private readonly workflowsGrpcService: WorkflowsGrpcService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @ExtractFromRequest(request => request.body.documentId)
    @UseGuards(DocumentAuthorGuard)
    public create(@Req() request: TAuthenticatedRequest, @Body() dto: CreateWorkflowDto) {
        return this.workflowsGrpcService.call("create", {
            documentId: dto.documentId,
            userId: request.jwtInfo.id
        });
    }

    @Post("/start/:workflowId")
    @ExtractFromRequest(request => request.body.workflowId)
    @UseGuards(WorkflowCreatorGuard)
    public start(@Req() request: TAuthenticatedRequest, @Param("workflowId") workflowId: string) {
        return this.workflowsGrpcService.call("start", {
            workflowId: workflowId,
            userId: request.jwtInfo.id
        });
    }

    @Get()
    public findOneByDocumentId(@Query("documentId") documentId: string) {
        return this.workflowsGrpcService.call("findOneByDocumentId", {
            id: documentId
        });
    }

    @Delete(":workflowId")
    @ExtractFromRequest(request => request.body.workflowId)
    @UseGuards(WorkflowCreatorGuard)
    public delete(@Req() request: TAuthenticatedRequest, @Param("workflowId") workflowId: string) {
        return this.workflowsGrpcService.call("delete", {
            workflowId: workflowId,
            userId: request.jwtInfo.id
        });
    }
}
