import { Body, Controller, Post } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";
import { UsersControllerApiInfo } from "./swagger/users-controller-api-info.decorator";
import { InviteUsersDto } from "apps/users/src/users/dto/invite-users.dto";

@Controller("users")
@UsersControllerApiInfo()
export class UsersController {
    public constructor(private readonly usersGrpcService: UsersGrpcService) {}

    @Post("/invitation")
    public sendInvitations(@Body() dto: InviteUsersDto) {
        return this.usersGrpcService.sendInvitations(dto);
    }
}
