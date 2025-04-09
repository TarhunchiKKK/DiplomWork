import { Inject, Injectable } from "@nestjs/common";
import { JwtTokensService } from "./jwt-tokens.service";
import { UserInvitationTokensService } from "./users-invitation-tokens.service";

@Injectable()
export class TokensService {
    public jwt: JwtTokensService;

    public userInvitation: UserInvitationTokensService;

    public constructor(
        @Inject(JwtTokensService.INJECTION_TOKEN) jwtTokensService: JwtTokensService,
        @Inject(UserInvitationTokensService.INJECTION_TOKEN) userInvitationTokensService: UserInvitationTokensService
    ) {
        this.jwt = jwtTokensService;
        this.userInvitation = userInvitationTokensService;
    }
}
