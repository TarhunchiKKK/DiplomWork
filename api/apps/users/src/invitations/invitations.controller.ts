import { Controller } from "@nestjs/common";
import {
    IConfirmInvitationDto,
    IInviteUsersDto,
    UsersServiceController,
    UsersServiceControllerMethods
} from "common/grpc";
import { InvitationsService } from "./invitations.service";
import { UnknownReturnTypes } from "common/utils";

type ServiceConttroller = Pick<UsersServiceController, "inviteUsers" | "confirmInvitation">;

@Controller()
@UsersServiceControllerMethods()
export class InvitationsController implements UnknownReturnTypes<ServiceConttroller> {
    public constructor(private readonly invitationsService: InvitationsService) {}

    public async inviteUsers(dto: IInviteUsersDto) {
        await this.invitationsService.send(dto);
    }

    public async confirmInvitation(dto: IConfirmInvitationDto) {
        return await this.invitationsService.confirmInvitation(dto);
    }
}
