import { Body, Controller, Patch, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Role } from "common/enums";
import { AccountDeactivationGrpcService } from "common/grpc";
import { RequireRoles, RoleGuard } from "common/middleware";
import { ActivateAccountDto } from "./dto/activate-account.dto";
import { DeactivateAccountDto } from "./dto/deactivate-account.dto";

@Controller("/users/account-deactivation")
export class AccountDeactivationController {
    public constructor(private readonly accountdeactivationGrpcService: AccountDeactivationGrpcService) {}

    @Patch("/activate")
    @RequireRoles([Role.ADMIN])
    @UseGuards(RoleGuard)
    @UsePipes(ValidationPipe)
    public activate(@Body() dto: ActivateAccountDto) {
        return this.accountdeactivationGrpcService.call("activate", dto);
    }

    @Patch("/deactivate")
    @RequireRoles([Role.ADMIN])
    @UseGuards(RoleGuard)
    @UsePipes(ValidationPipe)
    public deactivate(@Body() dto: DeactivateAccountDto) {
        return this.accountdeactivationGrpcService.call("deactivate", dto);
    }
}
