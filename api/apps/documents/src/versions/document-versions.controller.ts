import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { DocumentVersionsService } from "./document-versions.service";
import {
    DocumentVersionsServiceController,
    DocumentVersionsServiceControllerMethods,
    GrpcExceptionFilter,
    ICreateDocumentVersionDto,
    IOnlyId,
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

    public async findAll(dto: IOnlyId) {
        return await this.versionsService.findAll(dto.id);
    }

    public async findOneById(dto: IOnlyId) {
        return await this.versionsService.findOneById(dto.id);
    }

    public async findLast(dto: IOnlyId) {
        return await this.versionsService.findLast(dto.id);
    }
}
