import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
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

    public async findOneById(dto: IOnlyId) {
        return await this.commentsService.findOne(dto.id).then(transfromComment);
    }

    public async findAll(dto: IOnlyId) {
        return await this.commentsService.findAll(dto.id).then(transformCommentsArray);
    }

    public async update(dto: IUpdateDocumentCommentDto) {
        const { id, ...data } = dto;
        await this.commentsService.update(id, data);
    }

    public async delete(dto: IOnlyId) {
        await this.commentsService.delete(dto.id);
    }
}
