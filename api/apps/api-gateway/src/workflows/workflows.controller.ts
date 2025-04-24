import { Controller, Delete, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { WorkflowsGrpcService } from "common/grpc";
import { AuthenticationGuard, ExtractFromRequest } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { DocumentAuthorGuard } from "./middleware/document-author.guard";
import { WorkflowCreatorGuard } from "./middleware/workflow-creator.guard";

@Controller("/workflows")
@UseGuards(AuthenticationGuard)
export class WorkflowsController {
    public constructor(private readonly workflowsGrpcService: WorkflowsGrpcService) {}

    @Post(":documentId")
    @ExtractFromRequest(request => request.body.documentId)
    @UseGuards(DocumentAuthorGuard)
    public create(@Req() request: TAuthenticatedRequest, @Param("documentId") documentId: string) {
        return this.workflowsGrpcService.call("create", {
            documentId: documentId,
            userId: request.jwtInfo.id
        });
    }

    @Post("/start/:workflowId")
    @ExtractFromRequest(request => request.body.workflowId)
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

    @Delete(":workflowId")
    @ExtractFromRequest(request => request.body.workflowId)
    @UseGuards(WorkflowCreatorGuard)
    public delete(@Param("workflowId") workflowId: string) {
        return this.workflowsGrpcService.call("delete", {
            id: workflowId
        });
    }
}
