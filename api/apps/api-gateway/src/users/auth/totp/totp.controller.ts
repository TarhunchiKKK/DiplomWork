import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { TotpControllerApiInfo } from "./swagger/totp-controller-api-info.decorator";

@Controller("/users/auth/totp")
@TotpControllerApiInfo()
export class TotpController {
    public constructor(private readonly usersGrpcService: UsersGrpcService) {}

    @Post("/generate")
    @UseGuards(AuthenticationGuard)
    public generateTotp(@Req() request: TAuthenticatedRequest) {
        return this.usersGrpcService.generateTotp({
            userId: request.jwtInfo.id,
            userEmail: request.jwtInfo.email
        });
    }
}
