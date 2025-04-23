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

        await firstValueFrom(this.documentsGrpcService.call("findOneById", requestData));

        return true;
    }

    private exractRequestData(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const extractFromRequest = this.reflector.get(ExtractFromRequest, context.getHandler());

        const requestData = extractFromRequest(request) as { documentId: string; userId: string };

        if (!requestData.userId) {
            throw new UnauthorizedException("Недостаточно прав");
        } else if (!requestData.documentId) {
            throw new NotFoundException("Документ не найден");
        }

        return requestData;
    }
}
