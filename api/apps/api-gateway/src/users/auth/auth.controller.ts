import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersGrpcService } from "common/grpc";
import { RegisterAdminDto } from "./dto/register-admin.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { AuthControllerApiInfo } from "./swagger/auth-controller-api-info.decorator";
import { Recaptcha } from "@nestlab/google-recaptcha";

@Controller("/users/auth")
@AuthControllerApiInfo()
export class AuthController {
    public constructor(private readonly usersGrpcService: UsersGrpcService) {}

    @Post("/register-admin")
    @Recaptcha()
    @UsePipes(ValidationPipe)
    public registerAdmin(@Body() dto: RegisterAdminDto) {
        return this.usersGrpcService.registerAdmin(dto);
    }

    @Post("/login")
    @Recaptcha()
    @UsePipes(ValidationPipe)
    public login(@Body() dto: LoginDto) {
        return this.usersGrpcService.login(dto);
    }

    @Get("/me")
    @UseGuards(AuthenticationGuard)
    public me(@Req() request: TAuthenticatedRequest) {
        return this.usersGrpcService.refreshProfile({
            userId: request.jwtInfo.id
        });
    }
}
