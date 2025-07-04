import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AccountStatus } from "common/enums";
import { JwtTokensService, TJwtInfo } from "common/modules";
import { Request } from "express";

export abstract class BaseJwtGuard implements CanActivate {
    public constructor(
        protected readonly tokensService: JwtTokensService,

        protected readonly reflector: Reflector
    ) {}

    public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (request.jwtInfo) {
            return this.compareData(request.jwtInfo, context);
        }

        const token = this.extractBearerToken(request);

        try {
            const jwtInfo = this.tokensService.verify(token);

            request.jwtInfo = jwtInfo;

            return this.compareData(jwtInfo, context);
        } catch (_: unknown) {
            throw new UnauthorizedException("Некорректный токен");
        }
    }

    protected extractBearerToken(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];

        if (type !== "Bearer" || !token) {
            throw new UnauthorizedException("Токен авторизации не найден");
        }

        return token;
    }

    protected handleDeactivatedAccount(jwtInfo: TJwtInfo) {
        if (jwtInfo.status === AccountStatus.DEACTIVATED) {
            throw new UnauthorizedException("Аккаунт деактивирован");
        }
    }

    protected abstract compareData(info: TJwtInfo, context: ExecutionContext): boolean | Promise<boolean>;
}
