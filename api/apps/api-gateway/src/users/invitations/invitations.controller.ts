import { Body, Controller, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Role } from "common/enums";
import { UsersGrpcService } from "common/grpc";
import { RequireRoles, RoleGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { ConfirmInvitationDto } from "./dto/confirm-invitation.dto";
import { Recaptcha } from "@nestlab/google-recaptcha";

@Controller("/users/invitations")
export class InvitationsController {
    public constructor(private readonly usersGrpcService: UsersGrpcService) {}

    @Post("/send")
    @RequireRoles([Role.ADMIN])
    @UseGuards(RoleGuard)
    public sendInvitations(@Req() request: TAuthenticatedRequest, @Body() emails: string[]) {
        return this.usersGrpcService.call("inviteUsers", {
            organizationId: request.jwtInfo.organizationId,
            adminEmail: request.jwtInfo.email,
            emails: emails
        });
    }

    @Patch("/confirm")
    @Recaptcha()
    @UsePipes(ValidationPipe)
    public confirmInvitation(@Body() dto: ConfirmInvitationDto) {
        return this.usersGrpcService.call("confirmInvitation", dto);
    }
}
