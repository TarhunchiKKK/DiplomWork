import { Injectable } from "@nestjs/common";
import { BaseJwtAuthGuard } from "./base-jwt.guard";
import { TokensService } from "common/modules";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AuthenticationGuard extends BaseJwtAuthGuard {
    public constructor(
        readonly tokensService: TokensService,

        readonly reflector: Reflector
    ) {
        super(tokensService, reflector);
    }

    public compareData(): boolean {
        return true;
    }
}
