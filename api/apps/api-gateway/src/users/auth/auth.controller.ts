import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";
import { RegisterAdminDto } from "./dto/register-admin.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthControllerApiInfo } from "./swagger/auth-controller-api-info.decorator";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";

@Controller("auth")
@AuthControllerApiInfo()
export class AuthController {
    public constructor(private readonly usersGrpcService: UsersGrpcService) {}

    @Post("/register-admin")
    @UsePipes(ValidationPipe)
    public registerAdmin(@Body() dto: RegisterAdminDto) {
        return this.usersGrpcService.registerAdmin(dto);
    }

    @Post("/login")
    @UsePipes(ValidationPipe)
    public login(@Body() dto: LoginDto) {
        return this.usersGrpcService.login(dto);
    }

    @Get("/profile")
    @UseGuards(AuthenticationGuard)
    public profile(@Req() request: TAuthenticatedRequest) {
        return request.jwtInfo;
    }
}
