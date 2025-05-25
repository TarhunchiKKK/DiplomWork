import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { DocumentCommentsGrpcService } from "common/grpc/services/documents/services/document-comments.grpc-service";
import { AuthenticationGuard, ExtractFromRequest } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { CreateDocumentCommentDto } from "./dto/create-document-comment.dto";
import { UpdateDocumentCommentDto } from "./dto/update-document-comment.dto";
import { CommentAuthorGuard } from "./middleware/comment-author.guard";
import { DocumentOperationGuard } from "../middleware/guards/document-operation.guard";
import { ProvideOperation } from "../middleware/decorators/provide-operation.decorator";
import { DocumentOperation } from "../middleware/enums/document-operation.enum";
import { VersionOperationGuard } from "../middleware/guards/version-operation.guard";

@Controller("/comments")
@UseGuards(AuthenticationGuard)
export class DocumentCommentsController {
    public constructor(private readonly documentCommentsGrpcService: DocumentCommentsGrpcService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @ProvideOperation(DocumentOperation.CREATE_COMMENT)
    @ExtractFromRequest(request => request.body.versionId)
    @UseGuards(VersionOperationGuard)
    public create(@Req() request: TAuthenticatedRequest, @Body() dto: CreateDocumentCommentDto) {
        return this.documentCommentsGrpcService.call("create", {
            ...dto,
            creatorId: request.jwtInfo.id
        });
    }

    @Get(":versionId")
    @ProvideOperation(DocumentOperation.READ)
    @ExtractFromRequest(request => request.params.versionId)
    @UseGuards(DocumentOperationGuard)
    public findAll(@Param("versionId") versionId: string) {
        return this.documentCommentsGrpcService.call("findAll", {
            id: versionId
        });
    }

    @Patch(":commentId")
    @UsePipes(ValidationPipe)
    @ExtractFromRequest(request => request.params.commentId)
    @UseGuards(CommentAuthorGuard)
    public update(@Param("commentId") commentId: string, @Body() dto: UpdateDocumentCommentDto) {
        return this.documentCommentsGrpcService.call("update", {
            id: commentId,
            message: dto.message
        });
    }

    @Delete(":commentId")
    @ExtractFromRequest(request => request.params.commentId)
    @UseGuards(CommentAuthorGuard)
    public delete(@Param("commentId") commentId: string) {
        return this.documentCommentsGrpcService.call("delete", {
            id: commentId
        });
    }
}
