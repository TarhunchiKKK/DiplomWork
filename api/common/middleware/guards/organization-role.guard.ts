import { ExecutionContext, Injectable } from "@nestjs/common";
import { BaseJwtAuthGuard } from "./base-jwt.guard";
import { ExtractFromRequest, RequireRoles } from "../decorators";
import { Reflector } from "@nestjs/core";
import { TJwtInfo, TokensService } from "common/modules";

@Injectable()
export class OrganizationRoleGuard extends BaseJwtAuthGuard {
    public constructor(
        readonly tokensService: TokensService,

        readonly reflector: Reflector
    ) {
        super(tokensService, reflector);
    }

    public compareData(info: TJwtInfo, context: ExecutionContext): boolean {
        const roles = this.reflector.get(RequireRoles, context.getHandler());

        const extractFromRequest = this.reflector.get(ExtractFromRequest, context.getHandler());
        const organizationId = extractFromRequest(context.switchToHttp().getRequest()) as string;

        if (!roles || roles.length === 0) {
            return info.organizationId === organizationId;
        }

        return roles.includes(info.role) && info.organizationId === organizationId;
    }
}
