import { Injectable, UnauthorizedException } from "@nestjs/common";
import { DocumentAccessTokensService } from "common/modules";
import { ICheckPermissionsDto } from "./interfaces/check-permissions.dto";
import { DocumentRole } from "./enums/document-role.enum";
import { documentPermissions } from "./constants/document-access.constants";

@Injectable()
export class DocumentRolesService {
    public constructor(private readonly tokensService: DocumentAccessTokensService) {}

    public checkPermissions(dto: ICheckPermissionsDto) {
        const userRole = this.defineUserRole(dto);

        if (!userRole) {
            throw new UnauthorizedException("У вас нет прав на выполнение этого действия");
        }

        const allowOperation = documentPermissions[userRole].includes(dto.operation);

        if (!allowOperation) {
            throw new UnauthorizedException("У вас нет прав на выполнение этого действия");
        }
    }

    private defineUserRole(dto: ICheckPermissionsDto): DocumentRole | null {
        const tokenInfo = this.tokensService.verify(dto.token);

        let userRole: DocumentRole | null = null;

        if (tokenInfo.authorId === dto.userId) {
            userRole = DocumentRole.AUTHOR;
        } else if (tokenInfo.usersIds.includes(dto.userId)) {
            userRole = DocumentRole.REGULAR;
        }

        return userRole;
    }
}
