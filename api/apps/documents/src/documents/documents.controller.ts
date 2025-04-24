import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
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
    IFindOneById
} from "common/grpc";

@Controller()
@DocumentsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class DocumentsController implements UnwrapGrpcResponse<DocumentsServiceController> {
    public constructor(private readonly documentsService: DocumentsService) {}

    public async create(dto: ICreateDocumentDto) {
        return await this.documentsService.create(dto);
    }

    public async findOneById(dto: IFindOneById) {
        return await this.documentsService.findOneById(dto.id);
    }

    public async findAll(dto: IFindDocumentsDto) {
        return await this.documentsService.findAll(dto);
    }

    public async update(dto: IUpdateDocumentDto) {
        await this.documentsService.update(dto);
    }
}
