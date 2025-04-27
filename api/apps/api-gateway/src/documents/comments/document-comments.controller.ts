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
import { CommentGuard } from "./middleware/comments.guard";

@Controller("/documents/comments")
@UseGuards(AuthenticationGuard)
export class DocumentCommentsController {
    public constructor(private readonly documentCommentsGrpcService: DocumentCommentsGrpcService) {}

    @Post()
    @UsePipes(ValidationPipe)
    public create(@Req() request: TAuthenticatedRequest, @Body() dto: CreateDocumentCommentDto) {
        return this.documentCommentsGrpcService.call("create", {
            ...dto,
            creatorId: request.jwtInfo.id
        });
    }

    @Get(":versionId")
    public findAll(@Param("versionId") versionId: string) {
        return this.documentCommentsGrpcService.call("findAll", {
            id: versionId
        });
    }

    @Patch(":commentId")
    @UsePipes(ValidationPipe)
    @ExtractFromRequest(request => request.params.commentId)
    @UseGuards(CommentGuard)
    public update(@Param("commentId") commentId: string, @Body() dto: UpdateDocumentCommentDto) {
        return this.documentCommentsGrpcService.call("update", {
            id: commentId,
            message: dto.message
        });
    }

    @Delete(":commentId")
    @ExtractFromRequest(request => request.params.commentId)
    @UseGuards(CommentGuard)
    public delete(@Param("commentId") commentId: string) {
        return this.documentCommentsGrpcService.call("delete", {
            id: commentId
        });
    }
}
