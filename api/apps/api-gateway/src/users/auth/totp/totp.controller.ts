import { Body, Controller, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { TotpControllerApiInfo } from "./swagger/totp-controller-api-info.decorator";
import { EnableTotpDto } from "./dto/enable-totp.dto";

@Controller("/users/auth/totp")
@TotpControllerApiInfo()
export class TotpController {
    public constructor(private readonly usersGrpcService: UsersGrpcService) {}

    @Post("/generate")
    @UseGuards(AuthenticationGuard)
    public generate(@Req() request: TAuthenticatedRequest) {
        return this.usersGrpcService.generateTotp({
            userId: request.jwtInfo.id,
            userEmail: request.jwtInfo.email
        });
    }

    @Patch("/enable")
    @UseGuards(AuthenticationGuard)
    @UsePipes(ValidationPipe)
    public enable(@Req() request: TAuthenticatedRequest, @Body() dto: EnableTotpDto) {
        return this.usersGrpcService.enableTotp({
            ...dto,
            userId: request.jwtInfo.id,
            userEmail: request.jwtInfo.email
        });
    }

    @Patch("/disable")
    @UseGuards(AuthenticationGuard)
    public disable(@Req() request: TAuthenticatedRequest) {
        return this.usersGrpcService.disableTotp({
            userId: request.jwtInfo.id
        });
    }
}
