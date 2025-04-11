import { Body, Controller, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { PasswordRecoveryControllerApiInfo } from "./swagger/password-recovery-controller-api-info.decorator";

@Controller("/users/password-recovery")
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

    @Patch("/update")
    @UseGuards(AuthenticationGuard)
    @UsePipes(ValidationPipe)
    public update(@Body() dto: UpdatePasswordDto) {
        return this.usersGrpcService.updatePassword(dto);
    }
}
