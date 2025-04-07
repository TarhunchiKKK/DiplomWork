import { Controller } from "@nestjs/common";
import { IInviteUsersDto, UsersServiceController, UsersServiceControllerMethods } from "common/grpc";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller()
@UsersServiceControllerMethods()
export class UsersController implements UsersServiceController {
    public constructor(private readonly usersService: UsersService) {}

    public async create(dto: CreateUserDto) {
        return await this.usersService.create(dto);
    }

    public async inviteUsers(dto: IInviteUsersDto) {
        await this.usersService.inviteUsers(dto);
    }
}
