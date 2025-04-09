import { Body, Controller, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";
import { UsersControllerApiInfo } from "./swagger/users-controller-api-info.decorator";
import { RequireRoles } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { Role } from "common/enums";
import { RegisterAdminDto } from "apps/users/src/authentication/dto/register-admin.dto";

@Controller("users")
@UsersControllerApiInfo()
export class UsersController {
    public constructor(private readonly usersGrpcService: UsersGrpcService) {}

    @Post("/register/admin")
    @UsePipes(ValidationPipe)
    public registerAdmin(@Body() dto: RegisterAdminDto) {
        return this.usersGrpcService.registerAdmin(dto);
    }

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
