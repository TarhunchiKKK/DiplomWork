import { Injectable, CanActivate, ExecutionContext, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ExtractFromRequest } from "common/middleware";
import { DocumentAccessTokensService } from "common/modules";
import { documentPermissions } from "../constants/documents.constants";
import { ProvideOperation } from "../decorators/provide-operation.decorator";
import { DocumentOperation } from "../enums/document-operation.enum";
import { DocumentRole } from "../enums/document-role.enum";
import { TCheckPermissionsDto } from "../types/documen-access.types";
import { TRequestData } from "../types/request.types";

@Injectable()
export class DocumentAccessGuard implements CanActivate {
    public constructor(
        private readonly reflector: Reflector,

        private readonly tokensService: DocumentAccessTokensService
    ) {}

    public async canActivate(context: ExecutionContext) {
        // const requestData = this.extractRequestData(context);

        // const document = await this.findDocument(requestData);

        // this.checkPermissions(context, { userId: requestData.userId, token: document.accessToken });

        return true;
    }

    private extractRequestData(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const extractFromRequest = this.reflector.get(ExtractFromRequest, context.getHandler());

        const requestData = extractFromRequest(request) as TRequestData;

        if (!requestData.userId) {
            throw new UnauthorizedException("Необходимо авторизоваться");
        } else if (requestData.type === "Document" && !requestData.documentId) {
            throw new NotFoundException("Необходимо указать документ");
        } else if (requestData.type === "Version" && !requestData.versionId) {
            throw new NotFoundException("Необходимо указать версию");
        }

        return requestData;
    }

    private checkPermissions(context: ExecutionContext, dto: TCheckPermissionsDto) {
        const userRole = this.defineUserRole(dto);

        const operation = this.reflector.get<DocumentOperation>(ProvideOperation, context.getHandler());

        const allowOperation = documentPermissions[userRole].includes(operation);

        if (!allowOperation) {
            throw new UnauthorizedException("У вас нет прав на выполнение этого действия");
        }
    }

    private defineUserRole(dto: TCheckPermissionsDto) {
        const tokenInfo = this.tokensService.verify(dto.token);

        let userRole: DocumentRole | null = null;

        if (tokenInfo.authorId === dto.userId) {
            userRole = DocumentRole.AUTHOR;
        } else if (tokenInfo.usersIds.includes(dto.userId)) {
            userRole = DocumentRole.REGULAR;
        }

        if (!userRole) {
            throw new UnauthorizedException("У вас нет прав на выполнение этого действия");
        }

        return userRole;
    }
}
