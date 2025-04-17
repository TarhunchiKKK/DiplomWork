import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { DocumentsService } from "./documents.service";
import {
    DocumentsServiceController,
    DocumentsServiceControllerMethods,
    GrpcExceptionFilter,
    ICreateDocumentDto,
    WrapGrpcResponseInterceptor,
    UnwrapGrpcResponse,
    IUpdateDocumentInfoDto,
    IUpdateDocumentFileDto
} from "common/grpc";

type ServiceController = Pick<DocumentsServiceController, "create" | "updateInfo" | "updateFile">;

@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
@Controller()
@DocumentsServiceControllerMethods()
export class DocumentsController implements UnwrapGrpcResponse<ServiceController> {
    public constructor(private readonly documentsService: DocumentsService) {}

    public async create(dto: ICreateDocumentDto) {
        return await this.documentsService.create(dto);
    }

    public async updateInfo(dto: IUpdateDocumentInfoDto) {
        await this.documentsService.updateInfo(dto);
    }

    public async updateFile(dto: IUpdateDocumentFileDto) {
        return await this.documentsService.updateFile(dto);
    }
}
