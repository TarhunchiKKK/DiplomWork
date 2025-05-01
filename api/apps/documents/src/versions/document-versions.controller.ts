import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { DocumentVersionsService } from "./document-versions.service";
import {
    DocumentVersionsServiceController,
    DocumentVersionsServiceControllerMethods,
    GrpcExceptionFilter,
    ICreateDocumentVersionDto,
    IOnlyId,
    IUpdateDocumentVersionDto,
    UnwrapGrpcResponse,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { transformVersion, transfromVrsionsArray } from "./helpers/grpc.helpers";

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
        return await this.versionsService.findAll(dto.id).then(transfromVrsionsArray);
    }

    public async findOneById(dto: IOnlyId) {
        return await this.versionsService.findOneById(dto.id).then(transformVersion);
    }

    public async findLast(dto: IOnlyId) {
        return await this.versionsService.findLast(dto.id).then(transformVersion);
    }

    public async findDocument(dto: IOnlyId) {
        return await this.versionsService.findVersionDocument(dto.id);
    }

    public async update(dto: IUpdateDocumentVersionDto) {
        const { id, ...data } = dto;
        await this.versionsService.update(id, data);
    }
}
