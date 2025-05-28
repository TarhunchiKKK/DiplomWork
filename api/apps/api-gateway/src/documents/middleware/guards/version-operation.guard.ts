import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    NotFoundException,
    UnauthorizedException
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { DocumentVersionsGrpcService } from "common/grpc";
import { ExtractFromRequest } from "common/middleware";
import { firstValueFrom } from "rxjs";
import { TCheckPermissionsDto } from "../types/documen-access.types";
import { documentPermissions } from "../constants/documents.constants";
import { DocumentOperation } from "../enums/document-operation.enum";
import { ProvideOperation } from "../decorators/provide-operation.decorator";
import { DocumentAccessTokensService } from "common/modules";
import { DocumentRole } from "../enums/document-role.enum";

@Injectable()
export class VersionOperationGuard implements CanActivate {
    public constructor(
        private readonly versionsGrpcService: DocumentVersionsGrpcService,

        private readonly reflector: Reflector,

        private readonly tokensService: DocumentAccessTokensService
    ) {}

    public async canActivate(context: ExecutionContext) {
        const requestData = this.extractRequestData(context);

        const document = await firstValueFrom(
            this.versionsGrpcService.call("findDocument", {
                id: requestData.versionId
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
            throw new UnauthorizedException("Недостаточно прав");
        }

        const extractFromRequest = this.reflector.get(ExtractFromRequest, context.getHandler());

        const versionId = extractFromRequest(request) as string;

        if (!versionId) {
            throw new NotFoundException("Версия не найдена");
        }

        return { userId, versionId };
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

        let userRole: DocumentRole | null = null;

        if (dto.document.authorId === dto.userId) {
            userRole = DocumentRole.AUTHOR;
        } else if (tokenInfo.usersIds.includes(dto.userId)) {
            userRole = DocumentRole.REGULAR;
        }

        if (!userRole) {
            throw new ForbiddenException("У вас нет прав на выполнение этого действия");
        }

        return userRole;
    }
}
