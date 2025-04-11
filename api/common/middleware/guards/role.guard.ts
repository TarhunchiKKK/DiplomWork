import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { TJwtInfo, JwtTokensService } from "common/modules";
import { BaseJwtGuard } from "./base-jwt.guard";
import { RequireRoles } from "../decorators";

@Injectable()
export class RoleGuard extends BaseJwtGuard {
    public constructor(
        readonly tokensService: JwtTokensService,

        readonly reflector: Reflector
    ) {
        super(tokensService, reflector);
    }

    public compareData(jwtInfo: TJwtInfo, context: ExecutionContext): boolean {
        this.handleDeactivatedAccount(jwtInfo);

        const roles = this.reflector.get(RequireRoles, context.getHandler());

        if (!roles || roles.length === 0) {
            return true;
        }

        return roles.includes(jwtInfo.role);
    }
}
