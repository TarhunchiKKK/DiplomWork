import { ExecutionContext, Injectable } from "@nestjs/common";
import { BaseJwtAuthGuard } from "./base-jwt.guard";
import { TJwtInfo } from "common/types";
import { ExtractFromRequest, RequireRoles } from "../decorators";
import { JwtService } from "@nestjs/jwt";
import { Reflector } from "@nestjs/core";

@Injectable()
export class OrganizationRoleGuard extends BaseJwtAuthGuard {
    public constructor(
        readonly jwtService: JwtService,

        readonly reflector: Reflector
    ) {
        super(jwtService, reflector);
    }

    public compareData(info: TJwtInfo, context: ExecutionContext): boolean | Promise<boolean> {
        const roles = this.reflector.get(RequireRoles, context.getHandler());

        const extractFromRequest = this.reflector.get(ExtractFromRequest, context.getHandler());
        const organizationId = extractFromRequest(context.switchToHttp().getRequest()) as string;

        if (!roles || roles.length === 0) {
            return info.organizationId === organizationId;
        }

        return roles.includes(info.role) && info.organizationId === organizationId;
    }
}
