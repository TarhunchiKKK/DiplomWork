import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { Role } from "common/enums";
import { UsersGrpcService } from "common/grpc";
import { RequireRoles, RoleGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { ConfirmInvitationDto } from "./dto/confirm-invitation.dto";
import { InvitatiosnControllerApiInfo } from "./swagger/invitations-controller-api-info.decorator";

@Controller("/users/invitations")
@InvitatiosnControllerApiInfo()
export class InvitationsController {
    public constructor(private readonly usersGrpcService: UsersGrpcService) {}

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
    public confirmInvitation(@Body() dto: ConfirmInvitationDto) {
        return this.usersGrpcService.confirmInvitation(dto);
    }
}
