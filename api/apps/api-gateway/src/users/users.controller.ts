import { Controller, Get, Param, ParseArrayPipe, Req, UseGuards } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";

@Controller("users")
@UseGuards(AuthenticationGuard)
export class UsersController {
    public constructor(public readonly usersGrpcService: UsersGrpcService) {}

    @Get("/organization")
    public findAllByOrganizationId(@Req() request: TAuthenticatedRequest) {
        return this.usersGrpcService.call("findAllByOrganizationId", {
            id: request.jwtInfo.organizationId
        });
    }

    @Get(":ids")
    public async findAllByIds(@Param("ids", ParseArrayPipe) ids: string[]) {
        return this.usersGrpcService.call("findAllByIds", {
            ids: ids
        });
    }
}
