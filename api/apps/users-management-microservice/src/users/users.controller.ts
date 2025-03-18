import { Controller } from "@nestjs/common";
import { ICreateUserDto, UsersManagementServiceController, UsersManagementServiceControllerMethods } from "common/grpc";
import { UsersService } from "./users.service";

@Controller()
@UsersManagementServiceControllerMethods()
export class UsersController implements UsersManagementServiceController {
    public constructor(private readonly usersService: UsersService) {}

    public async create(dto: ICreateUserDto) {
        return await this.usersService.create(dto);
    }
}
