import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import {
    GrpcExceptionFilter,
    ICreateDocumentDto,
    WrapGrpcResponseInterceptor,
    UnwrapGrpcResponse,
    IFindDocumentsDto,
    IUpdateDocumentDto,
    IOnlyId,
    DocumentsServiceControllerMethods,
    DocumentsServiceController
} from "common/grpc";
import { transformDocumentsArray, transfromOneDocument } from "./helpers/grpc.helpers";

@Controller()
@DocumentsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class DocumentsController implements UnwrapGrpcResponse<DocumentsServiceController> {
    public constructor(private readonly documentsService: DocumentsService) {}

    public async create(dto: ICreateDocumentDto) {
        return await this.documentsService.create(dto);
    }

    public async findOneById(dto: IOnlyId) {
        return await this.documentsService.findOneById(dto.id).then(transfromOneDocument);
    }

    public async findAll(dto: IFindDocumentsDto) {
        return await this.documentsService.findAll(dto).then(transformDocumentsArray);
    }

    public async update({ id, ...dto }: IUpdateDocumentDto) {
        await this.documentsService.update(id, dto);
    }

    public async findOneFull(dto: IOnlyId) {
        return await this.documentsService.findOneById(dto.id);
    }
}
