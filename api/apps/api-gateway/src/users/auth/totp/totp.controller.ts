import { Body, Controller, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { TotpControllerApiInfo } from "./swagger/totp-controller-api-info.decorator";
import { EnableTotpDto } from "./dto/enable-totp.dto";
import { LoginWithTotpDto } from "./dto/login-with-totp.dto";

@Controller("/users/auth/totp")
@TotpControllerApiInfo()
export class TotpController {
    public constructor(private readonly usersGrpcService: UsersGrpcService) {}

    @Post("/generate")
    @UseGuards(AuthenticationGuard)
    public generate(@Req() request: TAuthenticatedRequest) {
        return this.usersGrpcService.call("generateTotp", {
            userId: request.jwtInfo.id,
            userEmail: request.jwtInfo.email
        });
    }

    @Patch("/enable")
    @UseGuards(AuthenticationGuard)
    @UsePipes(ValidationPipe)
    public enable(@Req() request: TAuthenticatedRequest, @Body() dto: EnableTotpDto) {
        return this.usersGrpcService.call("enableTotp", {
            ...dto,
            userId: request.jwtInfo.id,
            userEmail: request.jwtInfo.email
        });
    }

    @Patch("/disable")
    @UseGuards(AuthenticationGuard)
    public disable(@Req() request: TAuthenticatedRequest) {
        return this.usersGrpcService.call("disableTotp", {
            userId: request.jwtInfo.id
        });
    }

    @Post("/login")
    @UseGuards(AuthenticationGuard)
    @UsePipes(ValidationPipe)
    public login(@Req() request: TAuthenticatedRequest, @Body() dto: LoginWithTotpDto) {
        return this.usersGrpcService.call("loginWithTotp", {
            userId: request.jwtInfo.id,
            userEmail: request.jwtInfo.email,
            pin: dto.pin
        });
    }
}
