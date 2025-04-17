import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import {
    DocumentsServiceController,
    DocumentsServiceControllerMethods,
    GrpcExceptionFilter,
    ICreateDocumentDto,
    InsertGrpcResponseInterceptor,
    UnwrapGrpcResponse
} from "common/grpc";

type ServiceController = Pick<DocumentsServiceController, "create">;

@UseFilters(GrpcExceptionFilter)
@UseInterceptors(InsertGrpcResponseInterceptor)
@Controller()
@DocumentsServiceControllerMethods()
export class DocumentsController implements UnwrapGrpcResponse<ServiceController> {
    public constructor(private readonly documentsService: DocumentsService) {}

    public async create(dto: ICreateDocumentDto) {
        return await this.documentsService.create(dto);
    }
}
