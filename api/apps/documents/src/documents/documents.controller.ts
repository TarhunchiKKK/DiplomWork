import { Controller, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import {
    DocumentsServiceController,
    DocumentsServiceControllerMethods,
    GrpcExceptionFilter,
    ICreateDocumentDto,
    WrapGrpcResponseInterceptor,
    UnwrapGrpcResponse,
    IFindDocumentsDto,
    IUpdateDocumentDto,
    IFindDocumentByIdDto
} from "common/grpc";
import { ExtractFromRequest } from "common/middleware";
import { DocumentAccessGuard } from "../document-access/middleware/guards/document-access.guard";
import { ProvideOperation } from "../document-access/middleware/decorators/provide-operation.decorator";
import { DocumentOperation } from "../document-access/enums/document-operation.enum";

@Controller()
@DocumentsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class DocumentsController implements UnwrapGrpcResponse<DocumentsServiceController> {
    public constructor(private readonly documentsService: DocumentsService) {}

    public async create(dto: ICreateDocumentDto) {
        return await this.documentsService.create(dto);
    }

    @ProvideOperation(DocumentOperation.READ)
    @ExtractFromRequest((request: IFindDocumentByIdDto) => ({ documentId: request.documentId, userId: request.userId }))
    @UseGuards(DocumentAccessGuard)
    public async findOneById(dto: IFindDocumentByIdDto) {
        return await this.documentsService.findOneById(dto.documentId);
    }

    public async findAll(dto: IFindDocumentsDto) {
        return await this.documentsService.findAll(dto);
    }

    @ProvideOperation(DocumentOperation.UPDATE_INFO)
    @ExtractFromRequest((request: IUpdateDocumentDto) => ({ documentId: request.documentId, userId: request.userId }))
    @UseGuards(DocumentAccessGuard)
    public async update(dto: IUpdateDocumentDto) {
        await this.documentsService.update(dto);
    }
}
