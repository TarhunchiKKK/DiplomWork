import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";
import { UsersControllerApiInfo } from "./swagger/users-controller-api-info.decorator";
import { RequireRoles, RoleGuard } from "common/middleware";
import { Role } from "common/enums";
import { TAuthenticatedRequest } from "common/modules";

@Controller("users")
@UsersControllerApiInfo()
export class UsersController {
    public constructor(private readonly usersGrpcService: UsersGrpcService) {}

    @Post("/invitation")
    @RequireRoles([Role.ADMIN])
    // @UseGuards(RoleGuard)
    public sendInvitations(@Req() request: TAuthenticatedRequest, @Body() emails: string[]) {
        // return this.usersGrpcService.sendInvitations({
        //     organizationId: request.jwtInfo.organizationId,
        //     adminEmail: request.jwtInfo.email,
        //     emails: emails
        // });

        return this.usersGrpcService.sendInvitations({
            organizationId: "",
            adminEmail: "",
            emails: emails
        });
    }
}
