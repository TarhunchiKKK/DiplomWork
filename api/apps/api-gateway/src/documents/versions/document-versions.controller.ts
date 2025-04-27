import { Body, Controller, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthenticationGuard, ExtractFromRequest } from "common/middleware";
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
    @ExtractFromRequest(request => request.params.versionId)
    @UseGuards(DocumentAccessGuard)
    public create(@Body() dto: CreateDocumentVersionDto) {
        return this.documentVersionsGrpcService.call("create", dto);
    }

    @Get("/all/:documentId")
    @ProvideOperation(DocumentOperation.READ)
    @ExtractFromRequest(request => request.params.documentId)
    @UseGuards(DocumentAccessGuard)
    public findAll(@Param("documentId") documentId: string) {
        return this.documentVersionsGrpcService.call("findAll", {
            id: documentId
        });
    }

    @Get("/last/:documentId")
    public findLast(@Param("documentId") documentId: string) {
        return this.documentVersionsGrpcService.call("findLast", {
            id: documentId
        });
    }

    @Get("/:versionId")
    @ProvideOperation(DocumentOperation.READ)
    @ExtractFromRequest(request => request.params.versionId)
    @UseGuards(DocumentAccessGuard)
    public findOneById(@Param("versionId") versionId: string) {
        return this.documentVersionsGrpcService.call("findOneById", {
            id: versionId
        });
    }
}
