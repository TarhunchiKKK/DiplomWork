import { Controller } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { InviteUsersDto } from "./dto/invite-users.dto";
import { UsersService } from "./users.service";
import { IConfirmInvitationDto, UsersServiceController, UsersServiceControllerMethods } from "common/grpc";

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements Partial<UsersServiceController> {
    public constructor(private readonly usersService: UsersService) {}

    public async create(dto: CreateUserDto) {
        return await this.usersService.create(dto);
    }

    public async inviteUsers(dto: InviteUsersDto) {
        await this.usersService.inviteUsers(dto);
    }

    public async confirmInvitation(dto: IConfirmInvitationDto) {
        return await this.usersService.confirmInvitation(dto);
    }
}
