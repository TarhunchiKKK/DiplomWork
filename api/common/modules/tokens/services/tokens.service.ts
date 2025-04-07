import { Inject, Injectable } from "@nestjs/common";
import { JwtTokensService } from "./jwt-tokens.service";

@Injectable()
export class TokensService {
    public jwt: JwtTokensService;

    public constructor(@Inject(JwtTokensService.INJECTION_TOKEN) jwtTokensService: JwtTokensService) {
        this.jwt = jwtTokensService;
    }
}
