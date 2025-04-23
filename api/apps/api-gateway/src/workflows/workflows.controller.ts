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
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { CreateWorkflowDto } from "./dto/create-workflow.dto";

@Controller("/workflows")
@UseGuards(AuthenticationGuard)
export class WorkflowsController {
    public constructor(private readonly workflowsGrpcService: WorkflowsGrpcService) {}

    @Post()
    @UsePipes(ValidationPipe)
    public create(@Req() request: TAuthenticatedRequest, @Body() dto: CreateWorkflowDto) {
        return this.workflowsGrpcService.call("create", {
            documentId: dto.documentId,
            userId: request.jwtInfo.id
        });
    }

    @Post("/start/:workflowId")
    public start(@Req() request: TAuthenticatedRequest, @Param("workflowId") workflowId: string) {
        return this.workflowsGrpcService.call("start", {
            workflowId: workflowId,
            userId: request.jwtInfo.id
        });
    }

    @Get()
    public findOneByDocumentId(@Req() request: TAuthenticatedRequest, @Query("documentId") documentId: string) {
        return this.workflowsGrpcService.call("findOneByDocumentId", {
            documentId: documentId,
            userId: request.jwtInfo.id
        });
    }

    @Delete(":workflowId")
    public delete(@Req() request: TAuthenticatedRequest, @Param("workflowId") workflowId: string) {
        return this.workflowsGrpcService.call("delete", {
            workflowId: workflowId,
            userId: request.jwtInfo.id
        });
    }
}
