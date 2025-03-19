import { Controller } from "@nestjs/common";
import { UsersManagementServiceController, UsersManagementServiceControllerMethods } from "common/grpc";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller()
@UsersManagementServiceControllerMethods()
export class UsersController implements UsersManagementServiceController {
    public constructor(private readonly usersService: UsersService) {}

    public async create(dto: CreateUserDto) {
        return await this.usersService.create(dto);
    }
}
