import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    IConfirmInvitationDto,
    IInviteUsersDto,
    WrapGrpcResponseInterceptor,
    UnwrapGrpcResponse,
    UsersInvitationServiceController,
    UsersInvitationServiceControllerMethods
} from "common/grpc";
import { InvitationsService } from "./invitations.service";

@Controller()
@UsersInvitationServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class InvitationsController implements UnwrapGrpcResponse<UsersInvitationServiceController> {
    public constructor(private readonly invitationsService: InvitationsService) {}

    public async invite(dto: IInviteUsersDto) {
        await this.invitationsService.send(dto);
    }

    public async confirm(dto: IConfirmInvitationDto) {
        return await this.invitationsService.confirmInvitation(dto);
    }
}
