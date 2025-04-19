import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { DocumentsService } from "../../../documents/documents.service";
import { Reflector } from "@nestjs/core";
import { TCheckPermissionsDto } from "../../types/documen-access.types";
import { DocumentRole } from "../../enums/document-role.enum";
import { DocumentAccessTokensService } from "common/modules";
import { documentPermissions } from "../../constants/document-access.constants";
import { ExtractFromRequest } from "common/middleware";
import { TRequestData } from "../../types/request.types";
import { ProvideOperation } from "../decorators/provide-operation.decorator";

@Injectable()
export class DocumentAccessGuard implements CanActivate {
    public constructor(
        private readonly documentsService: DocumentsService,

        private readonly reflector: Reflector,

        private readonly tokensService: DocumentAccessTokensService
    ) {}

    public async canActivate(context: ExecutionContext) {
        const requestData = this.extractRequestData(context);

        const document = await this.documentsService.findOneById(requestData.documentId);

        this.checkPermissions(context, { userId: requestData.userId, token: document.accessToken });

        return true;
    }

    private extractRequestData(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();

        const extractFromRequest = this.reflector.get(ExtractFromRequest, context.getHandler());

        const requestData = extractFromRequest(request) as TRequestData;

        if (!requestData.userId) {
            throw new UnauthorizedException("Необходимо авторизоваться");
        } else if (!requestData.documentId) {
            throw new UnauthorizedException("Необходимо указать документ");
        }

        return requestData;
    }

    private checkPermissions(context: ExecutionContext, dto: TCheckPermissionsDto) {
        const userRole = this.defineUserRole(dto);

        const operation = this.reflector.get(ProvideOperation, context.getHandler());

        const allowOperation = documentPermissions[userRole].includes(operation);

        if (!allowOperation) {
            throw new UnauthorizedException("У вас нет прав на выполнение этого действия");
        }
    }

    private defineUserRole(dto: TCheckPermissionsDto): DocumentRole | null {
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
