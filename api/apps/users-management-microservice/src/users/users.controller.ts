import { Controller } from "@nestjs/common";
import { CreateUserDto, UsersManagementServiceController, UsersManagementServiceControllerMethods } from "common/grpc";
import { UsersService } from "./users.service";

@Controller()
@UsersManagementServiceControllerMethods()
export class UsersController implements UsersManagementServiceController {
    public constructor(private readonly usersService: UsersService) {}

    public async create(dto: CreateUserDto) {
        return await this.usersService.create(dto);
    }
}
