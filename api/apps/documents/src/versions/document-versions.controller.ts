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

    public async findAll({ id }: IOnlyId) {
        return await this.versionsService.findAll(id).then(transfromVrsionsArray);
    }

    public async findOneById({ id }: IOnlyId) {
        return await this.versionsService.findOneById(id).then(transformVersion);
    }

    public async findDocument({ id }: IOnlyId) {
        return await this.versionsService.findVersionDocument(id);
    }

    public async update({ id, ...dto }: IUpdateDocumentVersionDto) {
        await this.versionsService.update(id, dto);
    }
}
