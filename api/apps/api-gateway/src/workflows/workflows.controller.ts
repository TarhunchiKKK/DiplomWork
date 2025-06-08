import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseFilters,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { WorkflowsGrpcService } from "common/grpc";
import { AuthenticationGuard, ExtractFromRequest, GatewayExceptionFilter } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { DocumentAuthorGuard } from "./middleware/document-author.guard";
import { WorkflowCreatorGuard } from "./middleware/workflow-creator.guard";
import { CreateWorkflowDto } from "./dto/create-workflow.dto";
import { UpdateSignerDto } from "./dto/update-signer.dto";

@Controller("/workflows")
@UseFilters(GatewayExceptionFilter)
@UseGuards(AuthenticationGuard)
export class WorkflowsController {
    public constructor(private readonly workflowsGrpcService: WorkflowsGrpcService) {}

    @Post()
    @ExtractFromRequest(request => request.body.documentId)
    @UseGuards(DocumentAuthorGuard)
    public create(@Req() request: TAuthenticatedRequest, @Body() dto: CreateWorkflowDto) {
        return this.workflowsGrpcService.call("create", {
            ...dto,
            creatorId: request.jwtInfo.id
        });
    }

    @Post("/start/:documentId")
    @ExtractFromRequest(request => request.params.workflowId)
    @UseGuards(WorkflowCreatorGuard)
    public start(@Param("documentId") documentId: string) {
        return this.workflowsGrpcService.call("start", {
            id: documentId
        });
    }

    @Patch("/sign/:documentId")
    public sign(@Param("documentId") documentId: string) {
        return this.workflowsGrpcService.call("sign", {
            id: documentId
        });
    }

    @Patch("/signer/:workflowId")
    @ExtractFromRequest(request => request.params.workflowId)
    @UseGuards(WorkflowCreatorGuard)
    @UsePipes(ValidationPipe)
    public updateSigner(@Param("workflowId") workflowId: string, @Body() dto: UpdateSignerDto) {
        return this.workflowsGrpcService.call("updateSigner", {
            ...dto,
            workflowId
        });
    }

    @Get("/documents/:documentId")
    public findOneByDocumentId(@Param("documentId") documentId: string) {
        return this.workflowsGrpcService.call("findOneByDocumentId", {
            id: documentId
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

    @Get("/my")
    public async findAllByCreatorId(@Req() request: TAuthenticatedRequest) {
        return this.workflowsGrpcService.call("findAllByCreatorId", {
            id: request.jwtInfo.id
        });
    }
}
