import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { RegisterAdminDto } from "apps/authentication/src/authentication/dto/register-admin.dto";
import { AuthenticationGrpcService } from "common/grpc";

@Controller("auth")
export class AuthenticationController {
    public constructor(private readonly authenticationGrpcService: AuthenticationGrpcService) {}

    @Post("/register/admin")
    @UsePipes(ValidationPipe)
    public registerAdmin(@Body() dto: RegisterAdminDto) {
        return this.authenticationGrpcService.registerAdmin(dto);
    }
}
