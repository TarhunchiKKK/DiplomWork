import { Controller } from "@nestjs/common";
import { InviteUsersDto } from "../../../api-gateway/src/users/invitations/dto/invite-users.dto";
import { UsersService } from "./users.service";
import {
    IConfirmInvitationDto,
    ICreateUserDto,
    UsersServiceController,
    UsersServiceControllerMethods
} from "common/grpc";

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements Partial<UsersServiceController> {
    public constructor(private readonly usersService: UsersService) {}

    public async create(dto: ICreateUserDto) {
        return await this.usersService.create(dto);
    }

    public async inviteUsers(dto: InviteUsersDto) {
        await this.usersService.inviteUsers(dto);
    }

    public async confirmInvitation(dto: IConfirmInvitationDto) {
        return await this.usersService.confirmInvitation(dto);
    }
}
