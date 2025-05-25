import { Body, Controller, Patch, Post, Req, UseFilters, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Role } from "common/enums";
import { UsersInvitationGrpcService } from "common/grpc";
import { GatewayExceptionFilter, RequireRoles, RoleGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { ConfirmInvitationDto } from "./dto/confirm-invitation.dto";
import { Recaptcha } from "@nestlab/google-recaptcha";

@Controller("/users/invitations")
@UseFilters(GatewayExceptionFilter)
export class InvitationsController {
    public constructor(private readonly usersInvitationGrpcService: UsersInvitationGrpcService) {}

    @Post("/send")
    @RequireRoles([Role.ADMIN])
    @UseGuards(RoleGuard)
    public sendInvitations(@Req() request: TAuthenticatedRequest, @Body() emails: string[]) {
        return this.usersInvitationGrpcService.call("invite", {
            organizationId: request.jwtInfo.organizationId,
            adminEmail: request.jwtInfo.email,
            emails: emails
        });
    }

    @Patch("/confirm")
    @Recaptcha()
    @UsePipes(ValidationPipe)
    public confirmInvitation(@Body() dto: ConfirmInvitationDto) {
        return this.usersInvitationGrpcService.call("confirm", dto);
    }
}
