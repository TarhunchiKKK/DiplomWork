import { Body, Controller, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { TotpAuthenticationGrpcService } from "common/grpc";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { EnableTotpDto } from "./dto/enable-totp.dto";
import { LoginWithTotpDto } from "./dto/login-with-totp.dto";

@Controller("/users/auth/totp")
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
            userId: request.jwtInfo.id
        });
    }

    @Post("/login")
    @UseGuards(AuthenticationGuard)
    @UsePipes(ValidationPipe)
    public login(@Req() request: TAuthenticatedRequest, @Body() dto: LoginWithTotpDto) {
        return this.totpAuthenticationGrpcService.call("login", {
            userId: request.jwtInfo.id,
            userEmail: request.jwtInfo.email,
            pin: dto.pin
        });
    }
}
