import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { DocumentsGrpcService } from "common/grpc";
import { ExtractFromRequest } from "common/middleware";
import { firstValueFrom } from "rxjs";

@Injectable()
export class DocumentAuthorGuard implements CanActivate {
    public constructor(
        private readonly documentsGrpcService: DocumentsGrpcService,

        private readonly reflector: Reflector
    ) {}

    public async canActivate(context: ExecutionContext) {
        const requestData = this.exractRequestData(context);

        const document = await firstValueFrom(
            this.documentsGrpcService.call("findOneById", {
                id: requestData.documentId
            })
        );

        if (document.authorId !== requestData.userId) {
            throw new UnauthorizedException("Недостаточно прав");
        }

        return true;
    }

    private exractRequestData(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const userId = request.jwtInfo.id as string;

        if (!request.userId) {
            throw new UnauthorizedException("Недостаточно прав");
        }

        const extractFromRequest = this.reflector.get(ExtractFromRequest, context.getHandler());

        const documentId = extractFromRequest(request) as string | null;

        if (documentId) {
            throw new NotFoundException("Документ не найден");
        }

        return { userId, documentId };
    }
}
