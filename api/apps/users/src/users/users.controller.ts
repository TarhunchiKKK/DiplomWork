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

    public async findOne(dto: IOnlyId) {
        return await this.usersService.findOneById(dto.id);
    }

    public async findAllByIds(dto: IOnlyIds) {
        return await this.usersService.findAllByIds(dto.ids).then(transformUsersArray);
    }

    public async findAllByOrganizationId(dto: IOnlyId) {
        return await this.usersService.findAllByOrganizationId(dto.id).then(transformUsersArray);
    }

    public async updateProfile(dto: IUpdateProfileDto) {
        const { id, ...data } = dto;
        return await this.usersService.update(id, data);
    }
}
