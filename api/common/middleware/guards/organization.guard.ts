import { ExecutionContext, Injectable } from "@nestjs/common";
import { BaseJwtGuard } from "./base-jwt.guard";
import { ExtractFromRequest } from "../decorators";
import { Reflector } from "@nestjs/core";
import { TJwtInfo, JwtTokensService } from "common/modules";

@Injectable()
export class OrganizationGuard extends BaseJwtGuard {
    public constructor(
        readonly tokensService: JwtTokensService,

        readonly reflector: Reflector
    ) {
        super(tokensService, reflector);
    }

    public compareData(info: TJwtInfo, context: ExecutionContext): boolean {
        const extractFromRequest = this.reflector.get(ExtractFromRequest, context.getHandler());

        const organizationId = extractFromRequest(context.switchToHttp().getRequest()) as string;

        return info.organizationId === organizationId;
    }
}
