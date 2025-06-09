import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    DocumentHashingServiceController,
    DocumentHashingServiceControllerMethods,
    GrpcExceptionFilter,
    IUpdateDocumentHashDto,
    IVerifyDocumentHashDto,
    UnwrapGrpcResponse,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { DocumentHashingService } from "./document-hashing.service";
import { transfromVerifyResponse } from "./helpers/grpc.helpers";

@Controller()
@DocumentHashingServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class DocumentHashingController implements UnwrapGrpcResponse<DocumentHashingServiceController> {
    public constructor(private readonly hashingService: DocumentHashingService) {}

    public async update(dto: IUpdateDocumentHashDto) {
        await this.hashingService.update(dto);
    }

    public async verify(dto: IVerifyDocumentHashDto) {
        const isValid = await this.hashingService.verify(dto);
        return transfromVerifyResponse(isValid);
    }
}
