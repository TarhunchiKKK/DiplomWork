import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthenticationGrpcService } from "./authentication.grpc-service";
import { RegisterAdminDto } from "apps/authentication-microservice/src/authentication/dto/register-admin.dto";

@Controller("auth")
export class AuthenticationGrpcController {
    public constructor(private readonly authenticationGrpcService: AuthenticationGrpcService) {}

    @Post("/register/admin")
    @UsePipes(ValidationPipe)
    public registerAdmin(@Body() dto: RegisterAdminDto) {
        return this.authenticationGrpcService.registerAdmin(dto);
    }
}
