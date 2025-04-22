import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    DocumentCommentsServiceController,
    DocumentCommentsServiceControllerMethods,
    GrpcExceptionFilter,
    ICreateDocumentCommentDto,
    UnwrapGrpcResponse,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { DocumentCommentsService } from "./document-comments.service";

@Controller()
@DocumentCommentsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class DocumentCommentsController implements UnwrapGrpcResponse<DocumentCommentsServiceController> {
    public constructor(private readonly commentsService: DocumentCommentsService) {}

    public async create(dto: ICreateDocumentCommentDto) {
        return await this.commentsService.create(dto);
    }
}
