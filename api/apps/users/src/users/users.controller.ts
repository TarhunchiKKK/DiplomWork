import { Controller, UseFilters, UseInterceptors } from "@nestjs/common";
import {
    GrpcExceptionFilter,
    IOnlyId,
    IOnlyIds,
    IUpdateProfileDto,
    UnwrapGrpcResponse,
    UsersServiceController,
    UsersServiceControllerMethods,
    WrapGrpcResponseInterceptor
} from "common/grpc";
import { UsersService } from "./users.service";
import { transformUsersArray } from "./helpers/grpc.helpers";

@Controller()
@UsersServiceControllerMethods()
@UseFilters(GrpcExceptionFilter)
@UseInterceptors(WrapGrpcResponseInterceptor)
export class UsersController implements UnwrapGrpcResponse<UsersServiceController> {
    public constructor(private readonly usersService: UsersService) {}

    public async findOne({ id }: IOnlyId) {
        return await this.usersService.findOneById(id);
    }

    public async findAllByIds({ ids }: IOnlyIds) {
        return await this.usersService.findAllByIds(ids).then(transformUsersArray);
    }

    public async findAllByOrganizationId({ id }: IOnlyId) {
        return await this.usersService.findAllByOrganizationId(id).then(transformUsersArray);
    }

    public async updateProfile({ id, ...dto }: IUpdateProfileDto) {
        return await this.usersService.update(id, dto);
    }
}
