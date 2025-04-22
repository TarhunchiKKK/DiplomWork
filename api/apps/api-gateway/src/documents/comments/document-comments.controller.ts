import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { ICreateDocumentCommentDto } from "common/grpc";
import { DocumentCommentsGrpcService } from "common/grpc/services/documents/services/document-comments.grpc-service";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";

@Controller("/documents/comments")
export class DocumentCommentsController {
    public constructor(private readonly documentCommentsGrpcService: DocumentCommentsGrpcService) {}

    @Post()
    @UsePipes(ValidationPipe)
    @UseGuards(AuthenticationGuard)
    public create(@Req() request: TAuthenticatedRequest, @Body() dto: ICreateDocumentCommentDto) {
        return this.documentCommentsGrpcService.call("create", {
            ...dto,
            creatorId: request.jwtInfo.id
        });
    }
}
