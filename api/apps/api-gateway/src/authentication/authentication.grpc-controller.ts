import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationGrpcService } from "./authentication.grpc-service";
import { RegisterAdminDto } from "common/grpc";

@Controller("auth")
export class AuthenticationGrpcController {
    public constructor(private readonly authenticationGrpcService: AuthenticationGrpcService) {}

    @Post("/register/admin")
    public registerAdmin(@Body() dto: RegisterAdminDto) {
        return this.authenticationGrpcService.registerAdmin(dto);
    }
}
