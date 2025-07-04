import { Body, Controller, Patch, Post, Req, UseFilters, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { PasswordRecoveryGrpcService } from "common/grpc";
import { AuthenticationGuard, GatewayExceptionFilter } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Controller("/users/password-recovery")
@UseFilters(GatewayExceptionFilter)
@UseGuards(AuthenticationGuard)
export class PasswordRecoveryController {
    public constructor(private readonly passwordRecoveryGrpcservice: PasswordRecoveryGrpcService) {}

    @Post("/reset")
    public reset(@Req() request: TAuthenticatedRequest) {
        return this.passwordRecoveryGrpcservice.call("reset", {
            id: request.jwtInfo.id
        });
    }

    @Patch("/update")
    @UsePipes(ValidationPipe)
    public update(@Body() dto: UpdatePasswordDto) {
        return this.passwordRecoveryGrpcservice.call("update", dto);
    }
}
