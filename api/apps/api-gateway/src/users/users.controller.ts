import {
    Body,
    Controller,
    Get,
    Param,
    ParseArrayPipe,
    Patch,
    Query,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe
} from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Controller("users")
@UseGuards(AuthenticationGuard)
@UseGuards(AuthenticationGuard)
export class UsersController {
    public constructor(public readonly usersGrpcService: UsersGrpcService) {}

    @Get("organization")
    public findAllByOrganizationId(@Req() request: TAuthenticatedRequest) {
        return this.usersGrpcService.call("findAllByOrganizationId", {
            id: request.jwtInfo.organizationId
        });
    }

    @Get(":userId")
    public findOne(@Param("userId") userId: string) {
        return this.usersGrpcService.call("findOne", {
            id: userId
        });
    }

    @Get()
    public findAllByIds(@Query("ids", ParseArrayPipe) ids: string[]) {
        return this.usersGrpcService.call("findAllByIds", {
            ids: ids
        });
    }

    @Patch("profile")
    @UsePipes(ValidationPipe)
    public updateProfile(@Req() request: TAuthenticatedRequest, @Body() dto: UpdateProfileDto) {
        return this.usersGrpcService.call("updateProfile", {
            ...dto,
            id: request.jwtInfo.id
        });
    }
}
