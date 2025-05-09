import { Controller, Get, Param, ParseArrayPipe, UseGuards } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";
import { AuthenticationGuard } from "common/middleware";

@Controller("users")
@UseGuards(AuthenticationGuard)
export class UsersController {
    public constructor(public readonly usersGrpcService: UsersGrpcService) {}

    @Get("/organizations/:organizationId")
    public findAllByOrganizationId(@Param("organizationId") organizationId: string) {
        return this.usersGrpcService.call("findAllByOrganizationId", {
            id: organizationId
        });
    }

    @Get(":ids")
    public async findAllByIds(@Param("ids", ParseArrayPipe) ids: string[]) {
        return this.usersGrpcService.call("findAllByIds", {
            ids: ids
        });
    }
}
