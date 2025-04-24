import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthenticationGuard, ExtractFromRequest } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { CreateDocumentVersionDto } from "./dto/create-document-version.dto";
import { DocumentVersionsGrpcService } from "common/grpc";
import { ProvideOperation } from "../middleware/decorators/provide-operation.decorator";
import { DocumentOperation } from "../middleware/enums/document-operation.enum";
import { DocumentAccessGuard } from "../middleware/guards/document-access.guard";

@Controller("/documents/versions")
@UseGuards(AuthenticationGuard)
export class DocumentVersionsController {
    public constructor(private readonly documentVersionsGrpcService: DocumentVersionsGrpcService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @ProvideOperation(DocumentOperation.CREATE_VERSION)
    @ExtractFromRequest(request => request.body.versionId)
    @UseGuards(DocumentAccessGuard)
    public create(@Req() request: TAuthenticatedRequest, @Body() dto: CreateDocumentVersionDto) {
        return this.documentVersionsGrpcService.call("create", {
            ...dto,
            userId: request.jwtInfo.id
        });
    }

    @Get("/all/:documentId")
    @ProvideOperation(DocumentOperation.READ)
    @ExtractFromRequest(request => request.body.documentId)
    @UseGuards(DocumentAccessGuard)
    public findAll(@Req() request: TAuthenticatedRequest, @Param("documentId") documentId: string) {
        return this.documentVersionsGrpcService.call("findAll", {
            documentId: documentId,
            userId: request.jwtInfo.id
        });
    }

    @Get("/last/:documentId")
    public findLast(@Req() request: TAuthenticatedRequest, @Param("documentId") documentId: string) {
        return this.documentVersionsGrpcService.call("findLast", {
            documentId: documentId,
            userId: request.jwtInfo.id
        });
    }

    @Get("/:versionId")
    @ProvideOperation(DocumentOperation.READ)
    @ExtractFromRequest(request => request.body.documentId)
    @UseGuards(DocumentAccessGuard)
    public findOneById(@Req() request: TAuthenticatedRequest, @Param("versionId") versionId: string) {
        return this.documentVersionsGrpcService.call("findOneById", {
            versionId: versionId,
            userId: request.jwtInfo.id
        });
    }
}
