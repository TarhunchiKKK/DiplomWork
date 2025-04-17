import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    IConfirmInvitationDto,
    IInviteUsersDto,
    InsertGrpcResponseInterceptor,
    UnwrapGrpcResponse,
    UsersServiceController,
    UsersServiceControllerMethods
} from "common/grpc";
import { InvitationsService } from "./invitations.service";

type ServiceConttroller = Pick<UsersServiceController, "inviteUsers" | "confirmInvitation">;

@Controller()
@UsersServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(InsertGrpcResponseInterceptor)
export class InvitationsController implements UnwrapGrpcResponse<ServiceConttroller> {
    public constructor(private readonly invitationsService: InvitationsService) {}

    public async inviteUsers(dto: IInviteUsersDto) {
        await this.invitationsService.send(dto);
    }

    public async confirmInvitation(dto: IConfirmInvitationDto) {
        return await this.invitationsService.confirmInvitation(dto);
    }
}
