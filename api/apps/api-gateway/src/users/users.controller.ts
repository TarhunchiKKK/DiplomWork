import { Controller, Get, Param, ParseArrayPipe } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";

@Controller("users")
export class UsersController {
    public constructor(public readonly usersGrpcService: UsersGrpcService) {}

    @Get(":ids")
    public async findAllByIds(@Param(":ids", ParseArrayPipe) ids: string[]) {
        return this.usersGrpcService.call("findAllByIds", {
            ids: ids
        });
    }
}
