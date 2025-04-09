import { Controller } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";
import { UsersControllerApi } from "./swagger/users-controller-api.decorator";
import { InviteUsersDto } from "apps/users/src/users/dto/invite-users.dto";

@Controller("users")
@UsersControllerApi()
export class UsersController {
    public constructor(private readonly usersGrpcService: UsersGrpcService) {}

    public sendInvitations(dto: InviteUsersDto) {
        return this.usersGrpcService.sendInvitations(dto);
    }
}
