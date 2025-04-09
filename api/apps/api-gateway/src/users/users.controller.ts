import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";
import { UsersControllerApiInfo } from "./swagger/users-controller-api-info.decorator";
import { AuthenticationGuard, RequireRoles, RoleGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { Role } from "common/enums";
import { RegisterAdminDto } from "apps/api-gateway/src/users/dto/register-admin.dto";
import { ConfirmInvitationDto } from "./dto/confirm-invitation.dto";

@Controller("users")
@UsersControllerApiInfo()
export class UsersController {
    public constructor(private readonly usersGrpcService: UsersGrpcService) {}

    @Post("/register/admin")
    @UsePipes(ValidationPipe)
    public registerAdmin(@Body() dto: RegisterAdminDto) {
        return this.usersGrpcService.registerAdmin(dto);
    }

    @Post("/invitations/send")
    @RequireRoles([Role.ADMIN])
    @UseGuards(RoleGuard)
    public sendInvitations(@Req() request: TAuthenticatedRequest, @Body() emails: string[]) {
        return this.usersGrpcService.sendInvitations({
            organizationId: request.jwtInfo.organizationId,
            adminEmail: request.jwtInfo.email,
            emails: emails
        });
    }

    @Post("/invitations/confirm")
    @UseGuards(AuthenticationGuard)
    public confirmInvitation(@Req() request: TAuthenticatedRequest, @Body() dto: ConfirmInvitationDto) {
        return this.usersGrpcService.confirmInvitation({
            ...dto,
            id: request.jwtInfo.id
        });
    }
}
