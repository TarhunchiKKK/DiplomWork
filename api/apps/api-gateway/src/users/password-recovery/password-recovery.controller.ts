import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { PasswordRecoveryControllerApiInfo } from "./swagger/password-recovery-controller-api-info.decorator";

@Controller("password-recovery")
@PasswordRecoveryControllerApiInfo()
export class PasswordRecoveryController {
    public constructor(private readonly usersGrpcService: UsersGrpcService) {}

    @Post("/reset")
    @UseGuards(AuthenticationGuard)
    public reset(@Req() request: TAuthenticatedRequest) {
        return this.usersGrpcService.resetPassword({
            userId: request.jwtInfo.id
        });
    }

    @Post("/update")
    @UseGuards(AuthenticationGuard)
    public update(@Body() dto: UpdatePasswordDto) {
        return this.usersGrpcService.updatePassword(dto);
    }
}
