import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthenticationGrpcService } from "common/grpc";
import { RegisterAdminDto } from "./dto/register-admin.dto";
import { LoginDto } from "./dto/login.dto";
import { AuthenticationGuard } from "common/middleware";
import { TAuthenticatedRequest } from "common/modules";
import { Recaptcha } from "@nestlab/google-recaptcha";

@Controller("/users/auth")
export class AuthenticationController {
    public constructor(private readonly authenticationGrpcService: AuthenticationGrpcService) {}

    @Post("/register-admin")
    @Recaptcha()
    @UsePipes(ValidationPipe)
    public registerAdmin(@Body() dto: RegisterAdminDto) {
        return this.authenticationGrpcService.call("registerAdmin", dto);
    }

    @Post("/login")
    @Recaptcha()
    @UsePipes(ValidationPipe)
    public login(@Body() dto: LoginDto) {
        return this.authenticationGrpcService.call("login", dto);
    }

    @Get("/me")
    @UseGuards(AuthenticationGuard)
    public me(@Req() request: TAuthenticatedRequest) {
        return this.authenticationGrpcService.call("refreshProfile", {
            id: request.jwtInfo.id
        });
    }
}
