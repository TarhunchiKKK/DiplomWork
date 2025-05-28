import {
    Injectable,
    CanActivate,
    ExecutionContext,
    NotFoundException,
    UnauthorizedException,
    ForbiddenException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ExtractFromRequest } from "common/middleware";
import { DocumentAccessTokensService } from "common/modules";
import { documentPermissions } from "../constants/documents.constants";
import { ProvideOperation } from "../decorators/provide-operation.decorator";
import { DocumentOperation } from "../enums/document-operation.enum";
import { DocumentRole } from "../enums/document-role.enum";
import { TCheckPermissionsDto } from "../types/documen-access.types";
import { DocumentsGrpcService } from "common/grpc";
import { firstValueFrom } from "rxjs";

@Injectable()
export class DocumentOperationGuard implements CanActivate {
    public constructor(
        private readonly documentsGrpcService: DocumentsGrpcService,

        private readonly reflector: Reflector,

        private readonly tokensService: DocumentAccessTokensService
    ) {}

    public async canActivate(context: ExecutionContext) {
        return true;

        const requestData = this.extractRequestData(context);

        const document = await firstValueFrom(
            this.documentsGrpcService.call("findOneFull", {
                id: requestData.documentId
            })
        );

        this.checkPermissions(context, {
            userId: requestData.userId,
            document: document
        });

        return true;
    }

    private extractRequestData(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const userId = request.jwtInfo.id as string;

        if (!userId) {
            throw new ForbiddenException("Недостаточно прав");
        }

        const extractFromRequest = this.reflector.get(ExtractFromRequest, context.getHandler());

        const documentId = extractFromRequest(request) as string;

        if (!documentId) {
            throw new NotFoundException("Документ не найден");
        }

        return { userId, documentId };
    }

    private checkPermissions(context: ExecutionContext, dto: TCheckPermissionsDto) {
        const userRole = this.defineUserRole(dto);

        const operation = this.reflector.get<DocumentOperation>(ProvideOperation, context.getHandler());

        const allowOperation = documentPermissions[userRole].includes(operation);

        if (!allowOperation) {
            throw new ForbiddenException("У вас нет прав на выполнение этого действия");
        }
    }

    private defineUserRole(dto: TCheckPermissionsDto) {
        const tokenInfo = this.tokensService.verify(dto.document.accessToken);

        console.log(tokenInfo);

        let userRole: DocumentRole | null = null;

        if (dto.document.authorId === dto.userId) {
            userRole = DocumentRole.AUTHOR;
        } else if (tokenInfo.approversIds.includes(dto.userId)) {
            userRole = DocumentRole.REGULAR;
        }

        if (!userRole) {
            throw new ForbiddenException("У вас нет прав на выполнение этого действия");
        }

        return userRole;
    }
}
