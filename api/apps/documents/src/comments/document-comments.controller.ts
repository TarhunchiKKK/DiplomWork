import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import { GrpcExceptionFilter, WrapGrpcResponseInterceptor } from "common/grpc";
import { DocumentCommentsService } from "./document-comments.service";

@Controller()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class DocumentCommentsController {
    public constructor(private readonly commentsService: DocumentCommentsService) {}
}
