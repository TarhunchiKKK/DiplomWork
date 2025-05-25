import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    DOCUMENT_COMMENTS_SERVICE_NAME,
    DocumentCommentsServiceController,
    DocumentCommentsServiceControllerMethods,
    GrpcExceptionFilter,
    ICreateDocumentCommentDto,
    IOnlyId,
    IUpdateDocumentCommentDto,
    UnwrapGrpcResponse,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { DocumentCommentsService } from "./document-comments.service";
import { transformCommentsArray, transfromComment } from "./helpers/grpc.helpers";

@Controller()
@DocumentCommentsServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class DocumentCommentsController implements UnwrapGrpcResponse<DocumentCommentsServiceController> {
    public constructor(private readonly commentsService: DocumentCommentsService) {}

    public async create(dto: ICreateDocumentCommentDto) {
        return await this.commentsService.create(dto).then(transfromComment);
    }

    public async findOneById({ id }: IOnlyId) {
        return await this.commentsService.findOne(id).then(transfromComment);
    }

    public async findAll({ id }: IOnlyId) {
        return await this.commentsService.findAll(id).then(transformCommentsArray);
    }

    public async update({ id, ...dto }: IUpdateDocumentCommentDto) {
        await this.commentsService.update(id, dto);
    }

    public async delete({ id }: IOnlyId) {
        await this.commentsService.delete(id);
    }
}
