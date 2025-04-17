import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import {
    DocumentsServiceController,
    DocumentsServiceControllerMethods,
    GrpcExceptionFilter,
    ICreateDocumentDto,
    InsertGrpcResponseInterceptor
} from "common/grpc";
import { UnknownReturnTypes } from "common/utils";

type ServiceController = Pick<DocumentsServiceController, "create">;

@UseFilters(GrpcExceptionFilter)
@UseInterceptors(InsertGrpcResponseInterceptor)
@Controller()
@DocumentsServiceControllerMethods()
export class DocumentsController implements UnknownReturnTypes<ServiceController> {
    public constructor(private readonly documentsService: DocumentsService) {}

    public async create(dto: ICreateDocumentDto) {
        return await this.documentsService.create(dto);
    }
}
