import { Body, Controller, Param, Patch, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Role } from "common/enums";
import { AccountDeactivationGrpcService } from "common/grpc";
import { RequireRoles, RoleGuard } from "common/middleware";
import { ChangeAccountStatusDto } from "./dto/change-account-stattus.dto";

@Controller("/users/account-deactivation")
export class AccountDeactivationController {
    public constructor(private readonly accountdeactivationGrpcService: AccountDeactivationGrpcService) {}

    @Patch("change-stus/:userId")
    @RequireRoles([Role.ADMIN])
    @UseGuards(RoleGuard)
    @UsePipes(ValidationPipe)
    public changeStatus(@Param("userId") userId: string, @Body() dto: ChangeAccountStatusDto) {
        return this.accountdeactivationGrpcService.call("changeStatus", {
            ...dto,
            id: userId
        });
    }
}
