import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ExtractFromRequest } from "common/middleware";
import { DocumentCommentsGrpcService } from "common/grpc";
import { firstValueFrom } from "rxjs";

@Injectable()
export class CommentAuthorGuard implements CanActivate {
    public constructor(
        private readonly commentsService: DocumentCommentsGrpcService,

        private readonly reflector: Reflector
    ) {}

    public async canActivate(context: ExecutionContext) {
        const requestData = this.extractRequestdata(context);

        const comment = await firstValueFrom(
            this.commentsService.call("findOneById", {
                id: requestData.commentId
            })
        );

        if (comment.creatorId !== requestData.userId) {
            throw new ForbiddenException("Нет доступа");
        }

        return true;
    }

    private extractRequestdata(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const userId = request.jwtInfo.id as string;

        if (!userId) {
            throw new UnauthorizedException("Недостаточно прав");
        }

        const extractFromRequest = this.reflector.get(ExtractFromRequest, context.getHandler());

        const commentId = extractFromRequest(request) as string | null;

        if (commentId) {
            throw new NotFoundException("Комментарий не найден");
        }

        return { userId, commentId };
    }
}
