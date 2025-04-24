import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
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

@Controller()
@DocumentVersionsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class DocumentVersionsController implements UnwrapGrpcResponse<DocumentVersionsServiceController> {
    public constructor(private readonly versionsService: DocumentVersionsService) {}

    public async create(dto: ICreateDocumentVersionDto) {
        return await this.versionsService.create(dto);
    }

    public async findAll(dto: IFindAllDocumentVersionsDto) {
        return await this.versionsService.findAll(dto);
    }

    public async findOneById(dto: IFindDocumentVersionByIdDto) {
        return await this.versionsService.findOneById(dto);
    }

    public async findLast(dto: IFindLastDocumentVersionDto) {
        return await this.versionsService.findLast(dto);
    }
}
