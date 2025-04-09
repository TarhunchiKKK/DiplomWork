import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { TJwtInfo, TokensService } from "common/modules";
import { BaseJwtGuard } from "./base-jwt.guard";
import { RequireRoles } from "../decorators";

@Injectable()
export class RoleGuard extends BaseJwtGuard {
    public constructor(
        readonly tokensService: TokensService,

        readonly reflector: Reflector
    ) {
        super(tokensService, reflector);
    }

    public compareData(info: TJwtInfo, context: ExecutionContext): boolean {
        const roles = this.reflector.get(RequireRoles, context.getHandler());

        if (!roles || roles.length === 0) {
            return true;
        }

        return roles.includes(info.role);
    }
}
