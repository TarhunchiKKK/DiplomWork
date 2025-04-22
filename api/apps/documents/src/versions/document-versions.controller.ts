import { Controller, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { DocumentVersionsService } from "./document-versions.service";
import {
    DocumentVersionsServiceController,
    DocumentVersionsServiceControllerMethods,
    GrpcExceptionFilter,
    ICreateDocumentVersionDto,
    IFindAllDocumentVersionsDto,
    IFindDocumentVersionByIdDto,
    IFindLastDocumentVersionDto,
    UnwrapGrpcResponse,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { DocumentAccessGuard } from "../document-access/middleware/guards/document-access.guard";
import { ExtractFromRequest } from "common/middleware";
import { DocumentOperation } from "../document-access/enums/document-operation.enum";
import { ProvideOperation } from "../document-access/middleware/decorators/provide-operation.decorator";

@Controller()
@DocumentVersionsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class DocumentVersionsController implements UnwrapGrpcResponse<DocumentVersionsServiceController> {
    public constructor(private readonly versionsService: DocumentVersionsService) {}

    @ProvideOperation(DocumentOperation.CREATE_VERSION)
    @ExtractFromRequest((request: ICreateDocumentVersionDto) => ({
        versionId: request.documentId,
        userId: request.userId
    }))
    @UseGuards(DocumentAccessGuard)
    public async create(dto: ICreateDocumentVersionDto) {
        return await this.versionsService.create(dto);
    }

    @ProvideOperation(DocumentOperation.READ)
    @ExtractFromRequest((request: IFindAllDocumentVersionsDto) => ({
        documentId: request.documentId,
        userId: request.userId
    }))
    @UseGuards(DocumentAccessGuard)
    public async findAll(dto: IFindAllDocumentVersionsDto) {
        return await this.versionsService.findAll(dto);
    }

    public async findOneById(dto: IFindDocumentVersionByIdDto) {
        return await this.versionsService.findOneById(dto);
    }

    @ProvideOperation(DocumentOperation.READ)
    @ExtractFromRequest((request: IFindLastDocumentVersionDto) => ({
        documentId: request.documentId,
        userId: request.userId
    }))
    @UseGuards(DocumentAccessGuard)
    public async findLast(dto: IFindLastDocumentVersionDto) {
        return await this.versionsService.findLast(dto);
    }
}
