import { Body, Controller, Patch, Post, Req, UseFilters, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { TotpAuthenticationGrpcService } from "common/grpc";
import { AuthenticationGuard, GatewayExceptionFilter } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { EnableTotpDto } from "./dto/enable-totp.dto";
import { LoginWithTotpDto } from "./dto/login-with-totp.dto";

@Controller("/users/auth/totp")
@UseFilters(GatewayExceptionFilter)
export class TotpAuthenticationController {
    public constructor(private readonly totpAuthenticationGrpcService: TotpAuthenticationGrpcService) {}

    @Post("/generate")
    @UseGuards(AuthenticationGuard)
    public generate(@Req() request: TAuthenticatedRequest) {
        return this.totpAuthenticationGrpcService.call("generate", {
            userId: request.jwtInfo.id,
            userEmail: request.jwtInfo.email
        });
    }

    @Patch("/enable")
    @UseGuards(AuthenticationGuard)
    @UsePipes(ValidationPipe)
    public enable(@Req() request: TAuthenticatedRequest, @Body() dto: EnableTotpDto) {
        return this.totpAuthenticationGrpcService.call("enable", {
            ...dto,
            userId: request.jwtInfo.id,
            userEmail: request.jwtInfo.email
        });
    }

    @Patch("/disable")
    @UseGuards(AuthenticationGuard)
    public disable(@Req() request: TAuthenticatedRequest) {
        return this.totpAuthenticationGrpcService.call("disable", {
            id: request.jwtInfo.id
        });
    }

    @Post("/login")
    @UsePipes(ValidationPipe)
    public login(@Body() dto: LoginWithTotpDto) {
        return this.totpAuthenticationGrpcService.call("login", dto);
    }
}
