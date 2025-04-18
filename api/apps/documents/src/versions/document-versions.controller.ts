import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { DocumentVersionsService } from "./document-versions.service";
import {
    DocumentVersionsServiceController,
    DocumentVersionsServiceControllerMethods,
    GrpcExceptionFilter,
    ICreateDocumentVersionDto,
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
}
