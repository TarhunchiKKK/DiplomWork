import { Body, Controller, Patch, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Role } from "common/enums";
import { UsersGrpcService } from "common/grpc";
import { RequireRoles, RoleGuard } from "common/middleware";
import { ActivateAccountDto } from "./dto/activate-account.dto";
import { AccountDeactivationControllerApiInfo } from "./swagger/acount-deactivation-controller-api-info.decorator";

@Controller("/users/account-deactivation")
@AccountDeactivationControllerApiInfo()
export class AccountDeactivationController {
    public constructor(private readonly usersGrpcService: UsersGrpcService) {}

    @Patch("/activate")
    @RequireRoles([Role.ADMIN])
    @UseGuards(RoleGuard)
    @UsePipes(ValidationPipe)
    public activate(@Body() dto: ActivateAccountDto) {
        return this.usersGrpcService.deactivateAccount(dto);
    }

    @Patch("/deactivate")
    @RequireRoles([Role.ADMIN])
    @UseGuards(RoleGuard)
    @UsePipes(ValidationPipe)
    public deactivate(@Body() dto: ActivateAccountDto) {
        return this.usersGrpcService.activateAccount(dto);
    }
}
