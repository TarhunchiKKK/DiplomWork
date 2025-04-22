import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { DocumentCommentsService } from "../document-comments.service";
import { Reflector } from "@nestjs/core";
import { ExtractFromRequest } from "common/middleware";

@Injectable()
export class CommentGuard implements CanActivate {
    public constructor(
        private readonly commentsService: DocumentCommentsService,

        private readonly reflector: Reflector
    ) {}

    public async canActivate(context: ExecutionContext) {
        const requestData = this.extractRequestdata(context);

        const comment = await this.commentsService.findOne(requestData.commentId);

        if (comment.creatorId !== requestData.userId) {
            throw new UnauthorizedException("Нет доступа");
        }

        return true;
    }

    private extractRequestdata(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const extractFromRequest = this.reflector.get(ExtractFromRequest, context.getHandler());

        const requestData = extractFromRequest(request) as { commentId: string; userId: string };

        if (!requestData.userId) {
            throw new UnauthorizedException("Необходимо авторизоваться");
        } else if (!requestData.commentId) {
            throw new NotFoundException("Комментарий не найден");
        }

        return requestData;
    }
}
