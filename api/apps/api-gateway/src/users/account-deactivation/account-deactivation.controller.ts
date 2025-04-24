import { Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { Role } from "common/enums";
import { AccountDeactivationGrpcService } from "common/grpc";
import { RequireRoles, RoleGuard } from "common/middleware";

@Controller("/users/account-deactivation")
export class AccountDeactivationController {
    public constructor(private readonly accountdeactivationGrpcService: AccountDeactivationGrpcService) {}

    @Patch("/activate/:userId")
    @RequireRoles([Role.ADMIN])
    @UseGuards(RoleGuard)
    public activate(@Param("userId") userId: string) {
        return this.accountdeactivationGrpcService.call("activate", { id: userId });
    }

    @Patch("/deactivate")
    @RequireRoles([Role.ADMIN])
    @UseGuards(RoleGuard)
    public deactivate(@Param("userId") userId: string) {
        return this.accountdeactivationGrpcService.call("deactivate", { id: userId });
    }
}
