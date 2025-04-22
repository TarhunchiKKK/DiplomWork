import { Controller, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import {
    DocumentCommentsServiceController,
    DocumentCommentsServiceControllerMethods,
    GrpcExceptionFilter,
    ICreateDocumentCommentDto,
    IDeleteDocumentCommentDto,
    IFindAllDocumentCommentsDto,
    IUpdateDocumentCommentDto,
    UnwrapGrpcResponse,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { DocumentCommentsService } from "./document-comments.service";
import { ExtractFromRequest } from "common/middleware";
import { CommentGuard } from "./middleware/comments.guard";

@Controller()
@DocumentCommentsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class DocumentCommentsController implements UnwrapGrpcResponse<DocumentCommentsServiceController> {
    public constructor(private readonly commentsService: DocumentCommentsService) {}

    public async create(dto: ICreateDocumentCommentDto) {
        return await this.commentsService.create(dto);
    }

    public async findAll(dto: IFindAllDocumentCommentsDto) {
        return await this.commentsService.findAll(dto);
    }

    @ExtractFromRequest((request: IUpdateDocumentCommentDto) => {
        commentId: request.id;
        userId: request.userId;
    })
    @UseGuards(CommentGuard)
    public async update(dto: IUpdateDocumentCommentDto) {
        await this.commentsService.update(dto);
    }

    @ExtractFromRequest((request: IDeleteDocumentCommentDto) => {
        commentId: request.id;
        userId: request.userId;
    })
    @UseGuards(CommentGuard)
    public async delete(dto: IDeleteDocumentCommentDto) {
        await this.commentsService.delete(dto);
    }
}
