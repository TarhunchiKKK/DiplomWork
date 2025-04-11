import { Injectable } from "@nestjs/common";
import { BaseJwtGuard } from "./base-jwt.guard";
import { JwtTokensService, TJwtInfo } from "common/modules";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthenticationGuard extends BaseJwtGuard {
    public constructor(
        readonly tokensService: JwtTokensService,

        readonly reflector: Reflector
    ) {
        super(tokensService, reflector);
    }

    public compareData(jwtInfo: TJwtInfo): boolean {
        this.handleDeactivatedAccount(jwtInfo);

        return true;
    }
}
