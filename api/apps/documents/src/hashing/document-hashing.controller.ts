import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { DocumentHashingServiceControllerMethods, GrpcExceptionFilter, WrapGrpcResponseInterceptor } from "common/grpc";
import { DocumentHashingService } from "./document-hashing.service";

@Controller()
@DocumentHashingServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class DocumentHashingController {
    public constructor(hashingService: DocumentHashingService) {}
}
