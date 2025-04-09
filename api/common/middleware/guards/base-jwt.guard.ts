import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { TJwtInfo, TokensService } from "common/modules";
import { Request } from "express";

export abstract class BaseJwtAuthGuard implements CanActivate {
    public constructor(
        protected readonly tokensService: TokensService,

        protected readonly reflector: Reflector
    ) {}

    public canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = this.extractBearerToken(request);
        if (!token) {
            throw new UnauthorizedException("Токен авторизации не найден");
        }

        try {
            const jwtInfo = this.tokensService.jwt.verify(token);

            request["jwtInfo"] = jwtInfo;

            return this.compareData(jwtInfo, context);
        } catch (_: unknown) {
            throw new UnauthorizedException("Некорректный токен");
        }
    }

    protected extractBearerToken(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];

        return type === "Bearer" ? token : undefined;
    }

    protected abstract compareData(info: TJwtInfo, context: ExecutionContext): boolean | Promise<boolean>;
}
