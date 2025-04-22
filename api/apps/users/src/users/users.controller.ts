import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    IFindOneUserDto,
    UnwrapGrpcResponse,
    UsersServiceController,
    UsersServiceControllerMethods,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { UsersService } from "./users.service";

@Controller()
@UsersServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class UsersController implements UnwrapGrpcResponse<UsersServiceController> {
    public constructor(private readonly usersService: UsersService) {}

    public async findOne(dto: IFindOneUserDto) {
        return await this.usersService.findOneById(dto.id);
    }
}
